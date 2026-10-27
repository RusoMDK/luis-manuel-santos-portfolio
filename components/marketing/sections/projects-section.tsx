import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects } from "@/config/site";

export function ProjectsSection() {
  const t = useTranslations("Work");

  return (
    <section id="trabajo" className="section work field-walnut-2" aria-labelledby="work-title">
      <div className="frame">
        <h2 id="work-title" className="heading" data-reveal>
          {t("title")}
        </h2>
      </div>
      <ol className="folders">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={`folder folder-${index + 1}`}
            style={{ "--folder-index": index } as React.CSSProperties}
          >
            <div className="frame folder-strip">
              <h3 className="folder-tab">{t(`items.${project.id}.title`)}</h3>
              <p className="folder-meta">{t(`items.${project.id}.meta`)}</p>
            </div>
            <div className="frame grid folder-body">
              <p className="folder-stack">{t(`items.${project.id}.stack`)}</p>
              <div className="folder-text">
                <p>{t(`items.${project.id}.description`)}</p>
                <p className="folder-links">
                  {"caseStudySlug" in project ? (
                    <Link className="text-link" href={`/projects/${project.caseStudySlug}`} transitionTypes={["case-study"]}>
                      {t("caseStudy")}
                    </Link>
                  ) : null}
                  {"repoHref" in project ? (
                    <a className="text-link" href={project.repoHref} target="_blank" rel="noopener noreferrer">
                      {t("repo")}
                    </a>
                  ) : null}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
