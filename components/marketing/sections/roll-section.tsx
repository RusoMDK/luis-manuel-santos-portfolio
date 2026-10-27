import Image from "next/image";
import { useTranslations } from "next-intl";
import { rollEntries, rollPhotos, type RollEntryId } from "@/config/site";
import { ThesisLcdLazy } from "@/components/marketing/roll/thesis-lcd-lazy";

type Line = string | [string, string];
type Item = { name: string; lines: Line[] };
type Entry = (typeof rollEntries)[number];

// Consecutive copies of the same year share one big year in the margin; the copy
// where the ground turns to stone starts a group of its own.
const groups = rollEntries.reduce<{ year: number; stone: boolean; entries: Entry[] }[]>((list, entry) => {
  const stone = "stone" in entry && entry.stone;
  const last = list.at(-1);
  if (last && last.year === entry.year && last.stone === stone) last.entries.push(entry);
  else list.push({ year: entry.year, stone, entries: [entry] });
  return list;
}, []);

function Copy({ entry }: { entry: Entry }) {
  const t = useTranslations("Roll");
  const months = t.raw("months") as string[];
  const id: RollEntryId = entry.id;
  const items = t.raw(`entries.${id}.items`) as Item[];
  const hasNote = t.has(`entries.${id}.note`);
  const total = t(`entries.${id}.total`);
  const date = entry.month ? `${months[entry.month - 1]} ${entry.year}` : `${entry.year}`;

  return (
    <li className="roll-copy">
      <p className="roll-copy-head">
        {t("copy")} · <time dateTime={entry.month ? `${entry.year}-${String(entry.month).padStart(2, "0")}` : `${entry.year}`}>{date}</time>
      </p>
      {items.map((item) => (
        <div key={item.name} className="roll-item">
          <p className="roll-row roll-name">
            <span>{item.name}</span>
            <span>× 1</span>
          </p>
          {item.lines.map((line) =>
            typeof line === "string" ? (
              <p key={line} className="roll-detail">
                {line}
              </p>
            ) : (
              <p key={line.join()} className="roll-row roll-line">
                <span>{line[0]}</span>
                <span>{line[1]}</span>
              </p>
            ),
          )}
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

/** What sits beside a year: the photographs and the one live piece of the roll. */
function Side({ entries }: { entries: Entry[] }) {
  const t = useTranslations("Roll");
  const ids = entries.map((entry) => entry.id as string);

  if (ids.includes("thesis")) {
    return (
      <div className="roll-side">
        <figure className="roll-photos" data-reveal>
          <Image
            src={rollPhotos.thesisBench.src}
            width={rollPhotos.thesisBench.width}
            height={rollPhotos.thesisBench.height}
            alt={t("thesisPhotoAlt")}
            sizes="(max-width: 900px) 100vw, 40vw"
          />
          <Image
            src={rollPhotos.thesisLcd.src}
            width={rollPhotos.thesisLcd.width}
            height={rollPhotos.thesisLcd.height}
            alt={t("thesisLcdAlt")}
            sizes="(max-width: 900px) 100vw, 40vw"
          />
          <figcaption className="caption">{t("thesisCaption")}</figcaption>
        </figure>
        <ThesisLcdLazy />
      </div>
    );
  }
  if (ids.includes("iotPlatform")) {
    return (
      <div className="roll-side">
        <figure className="roll-photos" data-reveal>
          <Image
            src={rollPhotos.seedbed.src}
            width={rollPhotos.seedbed.width}
            height={rollPhotos.seedbed.height}
            alt={t("seedbedAlt")}
            sizes="(max-width: 900px) 100vw, 40vw"
          />
          <figcaption className="caption">{t("seedbedCaption")}</figcaption>
        </figure>
      </div>
    );
  }
  return <div className="roll-side" />;
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

      {groups.map((group, index) => (
        <div
          key={`${group.year}-${group.stone}`}
          className={group.stone ? "roll-group field-stone" : "roll-group"}
          data-last={index === groups.length - 1 || undefined}
        >
          <div className="frame roll-grid">
            <p className="roll-year" aria-hidden="true" data-roll-year>
              {group.year}
            </p>
            <ol className="roll-strip" data-ui>
              {group.entries.map((entry) => (
                <Copy key={entry.id} entry={entry} />
              ))}
            </ol>
            <Side entries={group.entries} />
          </div>
        </div>
      ))}
    </section>
  );
}
