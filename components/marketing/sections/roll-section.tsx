import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { rollEntries, rollPhotos, type RollEntryId } from "@/config/site";
import { ThesisLcdLazy } from "@/components/marketing/roll/thesis-lcd-lazy";
import { Shot } from "@/components/marketing/kwad/shot";

type Item = { name: string; lines: string[]; incl?: string[] };
type Entry = (typeof rollEntries)[number];

// One group per year: the year and its pictures on the right, its copies on the
// left. The ground turns to stone inside the last group, at the copy marked stone.
const groups = rollEntries.reduce<{ year: number; entries: Entry[] }[]>((list, entry) => {
  const last = list.at(-1);
  if (last && last.year === entry.year) last.entries.push(entry);
  else list.push({ year: entry.year, entries: [entry] });
  return list;
}, []);

const pad = (month: number) => String(month).padStart(2, "0");

// The copies that carry pictures. On a phone the pictures print right after their copy.
const withMedia = ["thesis", "iotPlatform", "kwad"] as const;
const hasMedia = (id: RollEntryId): id is (typeof withMedia)[number] => (withMedia as readonly string[]).includes(id);
const inlineOnPhone = (id: RollEntryId) => id !== "kwad";
// The reading order on a phone: copy i is 2i + 1, the pictures of copy i are 2i + 2.
const order = (value: number) => ({ "--order": value }) as CSSProperties;

function Copy({ entry, index }: { entry: Entry; index: number }) {
  const t = useTranslations("Roll");
  const months = t.raw("months") as string[];
  const id: RollEntryId = entry.id;
  const items = t.raw(`entries.${id}.items`) as Item[];
  const hasNote = t.has(`entries.${id}.note`);
  const total = t(`entries.${id}.total`);
  const label = (year: number, month: number | null) => (month ? `${months[month - 1]} ${year}` : `${year}`);
  const stamp = (year: number, month: number | null) => (month ? `${year}-${pad(month)}` : `${year}`);
  const until = "until" in entry ? entry.until : undefined;

  return (
    <li
      className="roll-copy"
      style={order(2 * index + 1)}
      data-experience={"experience" in entry || undefined}
      data-stone={"stone" in entry || undefined}
    >
      {"stone" in entry ? <span className="roll-ground" aria-hidden="true" /> : null}
      {"experience" in entry ? <p className="roll-stamp">{t("experience")}</p> : null}
      <p className="roll-copy-head">
        {t("copy")} · <time dateTime={stamp(entry.year, entry.month)}>{label(entry.year, entry.month)}</time>
        {until !== undefined ? (
          <>
            {" – "}
            {until ? <time dateTime={stamp(until.year, until.month)}>{label(until.year, until.month)}</time> : t("now")}
          </>
        ) : null}
      </p>
      {items.map((item) => (
        <div key={item.name} className="roll-item">
          <p className="roll-row roll-name">
            <span>{item.name}</span>
            <span>× 1</span>
          </p>
          {item.lines.map((line) => (
            <p key={line} className="roll-detail">
              {line}
            </p>
          ))}
          {item.incl ? (
            <p className="roll-incl">
              <span className="roll-incl-label">{t("incl")}</span> {item.incl.join(" · ")}
            </p>
          ) : null}
        </div>
      ))}
      <p className="roll-cut" aria-hidden="true" />
      <p className="roll-row roll-total">
        <span>{t("total")}</span>
        {"anchor" in entry ? (
          <a href={entry.anchor} aria-label={t("kwadAria")}>
            {total}
          </a>
        ) : (
          <span>{total}</span>
        )}
      </p>
      {hasNote ? <p className="roll-note">{t(`entries.${id}.note`)}</p> : null}
      {"repoHref" in entry ? (
        <p className="roll-repo">
          <a href={entry.repoHref} target="_blank" rel="noopener noreferrer">
            {entry.repoHref.replace("https://", "")}
          </a>
        </p>
      ) : null}
    </li>
  );
}

/** The pictures of a copy: the thesis and its one live piece, the seedbed, KWAD. */
function Media({ id }: { id: (typeof withMedia)[number] }) {
  const t = useTranslations("Roll");

  if (id === "thesis") {
    return (
      <>
        <figure className="roll-photos" data-reveal>
          <Image
            src={rollPhotos.thesisBench.src}
            width={rollPhotos.thesisBench.width}
            height={rollPhotos.thesisBench.height}
            alt={t("thesisPhotoAlt")}
            fetchPriority="low"
            sizes="(max-width: 900px) 50vw, 25vw"
          />
          <Image
            src={rollPhotos.thesisLcd.src}
            width={rollPhotos.thesisLcd.width}
            height={rollPhotos.thesisLcd.height}
            alt={t("thesisLcdAlt")}
            fetchPriority="low"
            sizes="(max-width: 900px) 50vw, 25vw"
          />
          <figcaption className="caption">{t("thesisCaption")}</figcaption>
        </figure>
        <ThesisLcdLazy />
      </>
    );
  }
  if (id === "iotPlatform") {
    return (
      <figure className="roll-photos" data-reveal>
        <Image
          src={rollPhotos.seedbed.src}
          width={rollPhotos.seedbed.width}
          height={rollPhotos.seedbed.height}
          alt={t("seedbedAlt")}
          fetchPriority="low"
          sizes="(max-width: 900px) 100vw, 45vw"
        />
        <figcaption className="caption">{t("seedbedCaption")}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="roll-kwad" data-reveal>
      <Shot id="reception" alt={t("receptionAlt")} />
      <figcaption className="caption">{t("receptionCaption")}</figcaption>
    </figure>
  );
}

export function RollSection() {
  const t = useTranslations("Roll");

  return (
    <section id="trayectoria" className="roll field-walnut" aria-labelledby="roll-title">
      <header className="frame grid roll-head">
        <h2 id="roll-title" className="heading roll-title" data-split>
          {t("title")}
        </h2>
        <p className="lead roll-lead" data-reveal>
          {t("lead")}
        </p>
      </header>

      {groups.map((group, index) => {
        const owner = group.entries.findIndex((entry) => hasMedia(entry.id));
        const id = owner >= 0 ? group.entries[owner].id : null;
        return (
          <div
            key={group.year}
            className="frame roll-group"
            data-last={index === groups.length - 1 || undefined}
            data-inline-media={(id && inlineOnPhone(id)) || undefined}
          >
            <div className="roll-side">
              <p className="roll-year" aria-hidden="true" data-roll-year>
                {group.year}
              </p>
              {id && hasMedia(id) ? (
                <div className="roll-media" style={order(2 * owner + 2)}>
                  <Media id={id} />
                </div>
              ) : null}
            </div>
            <ol className="roll-strip" data-ui>
              {group.entries.map((entry, position) => (
                <Copy key={entry.id} entry={entry} index={position} />
              ))}
            </ol>
          </div>
        );
      })}
    </section>
  );
}
