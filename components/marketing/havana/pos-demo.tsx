"use client";

import { useReducer } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  demoProducts,
  demoRates,
  type DemoCurrency,
  type DemoProductId,
} from "@/config/site";
import { randomKey } from "@/lib/visit";

type LogStatus = "queued" | "created" | "duplicate";

type LogEntry = { id: number; time: string; key: string; status: LogStatus };

type State = {
  cart: Record<DemoProductId, number>;
  currency: DemoCurrency;
  online: boolean;
  saleKey: string | null;
  queue: string[];
  recorded: string[];
  log: LogEntry[];
  attempts: number;
};

type Action =
  | { type: "add" | "remove"; id: DemoProductId }
  | { type: "currency"; currency: DemoCurrency }
  | { type: "network"; online: boolean; time: string }
  | { type: "charge"; key: string; time: string }
  | { type: "newSale" };

// The cart starts filled so the first press of Cobrar already means something.
const initialState: State = {
  cart: { coffee: 1, malta: 2, milk: 0, crackers: 0 },
  currency: "USD",
  online: true,
  saleKey: null,
  queue: [],
  recorded: [],
  log: [],
  attempts: 0,
};

// The server side of the demo: a sale key is recorded once, every repeat is ignored.
function send(state: State, key: string, time: string): State {
  const duplicate = state.recorded.includes(key);
  return {
    ...state,
    recorded: duplicate ? state.recorded : [...state.recorded, key],
    log: [
      ...state.log,
      { id: state.log.length, time, key, status: duplicate ? "duplicate" : "created" },
    ],
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
    case "remove": {
      // A charged ticket is closed; changing it starts a new sale.
      if (state.saleKey) return state;
      const quantity = state.cart[action.id] + (action.type === "add" ? 1 : -1);
      return { ...state, cart: { ...state.cart, [action.id]: Math.max(0, quantity) } };
    }
    case "currency":
      return { ...state, currency: action.currency };
    case "network": {
      if (!action.online) return { ...state, online: false };
      // Reconnecting flushes every queued attempt to the server.
      return state.queue.reduce(
        (next, key) => send(next, key, action.time),
        { ...state, online: true, queue: [] } as State,
      );
    }
    case "charge": {
      const key = state.saleKey ?? action.key;
      const next = { ...state, saleKey: key, attempts: state.attempts + 1 };
      if (!state.online) {
        return {
          ...next,
          queue: [...state.queue, key],
          log: [...state.log, { id: state.log.length, time: action.time, key, status: "queued" }],
        };
      }
      return send(next, key, action.time);
    }
    case "newSale":
      return { ...state, cart: { coffee: 0, malta: 0, milk: 0, crackers: 0 }, saleKey: null };
  }
}

const clock = () => new Date().toTimeString().slice(0, 8);

export function PosDemo() {
  const t = useTranslations("Havana.demo");
  const locale = useLocale();
  const [state, dispatch] = useReducer(reducer, initialState);

  const format = (usd: number) => {
    const amount = usd * demoRates[state.currency];
    return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB", {
      style: "currency",
      currency: state.currency,
      currencyDisplay: "code",
      minimumFractionDigits: state.currency === "CUP" ? 0 : 2,
      maximumFractionDigits: state.currency === "CUP" ? 0 : 2,
    }).format(amount);
  };

  const totalUsd = demoProducts.reduce((sum, product) => sum + product.price * state.cart[product.id], 0);
  const isEmpty = totalUsd === 0;
  const recordedCurrent = state.saleKey !== null && state.recorded.includes(state.saleKey);
  const closed = state.saleKey !== null;

  return (
    <div className="pos" data-ui>
      <section className="pos-till" aria-label={t("label")}>
        <header className="pos-bar">
          <span className="pos-title">{t("register")}</span>
          <div className="pos-toggle" role="group" aria-label={t("currency")}>
            {(Object.keys(demoRates) as DemoCurrency[]).map((currency) => (
              <button
                key={currency}
                type="button"
                aria-pressed={state.currency === currency}
                onClick={() => dispatch({ type: "currency", currency })}
              >
                {currency}
              </button>
            ))}
          </div>
        </header>

        <ul className="pos-products">
          {demoProducts.map((product) => {
            const name = t(`products.${product.id}`);
            const quantity = state.cart[product.id];
            return (
              <li key={product.id} className="pos-product">
                <button
                  type="button"
                  className="pos-add"
                  onClick={() => dispatch({ type: "add", id: product.id })}
                  disabled={closed}
                  aria-label={t("add", { name })}
                >
                  <span className="pos-name">{name}</span>
                  <span className="pos-price">{format(product.price)}</span>
                </button>
                <span className="pos-qty" aria-live="polite">
                  × {quantity}
                </span>
                <button
                  type="button"
                  className="pos-remove"
                  onClick={() => dispatch({ type: "remove", id: product.id })}
                  disabled={closed || quantity === 0}
                  aria-label={t("remove", { name })}
                >
                  −
                </button>
              </li>
            );
          })}
        </ul>

        <p className="pos-total">
          <span>{t("total")}</span>
          <span>{isEmpty ? t("empty") : format(totalUsd)}</span>
        </p>
        <p className="pos-key">
          {t("key")}: <span>{state.saleKey ?? t("keyPending")}</span>
        </p>

        <div className="pos-controls">
          <button
            type="button"
            className="pos-network"
            aria-pressed={!state.online}
            onClick={() => dispatch({ type: "network", online: !state.online, time: clock() })}
          >
            {t("network")}: {state.online ? t("online") : t("offline")}
            <span className="pos-network-action">{state.online ? "" : ` · ${t("reconnect")}`}</span>
          </button>
          <button
            type="button"
            className="pos-charge"
            disabled={isEmpty}
            onClick={() => dispatch({ type: "charge", key: randomKey(), time: clock() })}
          >
            {t("charge")}
          </button>
        </div>
        {closed ? (
          <button type="button" className="pos-new" onClick={() => dispatch({ type: "newSale" })}>
            {t("newSale")}
          </button>
        ) : null}
        <p className="pos-rates">{t("rates")}</p>
      </section>

      <section className="slip" aria-label={t("server")}>
        <p className="slip-title">{t("server")}</p>
        <p className="slip-count" aria-live="polite">
          <span>
            {t("attempts")}: {state.attempts}
          </span>
          <span>
            {t("sales")}: {state.recorded.length}
          </span>
        </p>
        <ol className="slip-log" aria-live="polite">
          {state.log.length === 0 ? <li className="slip-empty">{t("noAttempts")}</li> : null}
          {state.log.map((entry) => (
            <li key={entry.id} className={`slip-line slip-${entry.status}`}>
              <span>{entry.time}</span>
              <span>{entry.key}</span>
              <span>{t(entry.status)}</span>
            </li>
          ))}
        </ol>
        {recordedCurrent ? (
          <p className="slip-result">{t("result", { total: format(totalUsd) })}</p>
        ) : null}
      </section>
    </div>
  );
}
