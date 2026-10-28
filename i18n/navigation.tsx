import type { ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = navigation;

type IntlLinkProps = ComponentProps<typeof navigation.Link>;

// next-intl forwards every other prop to next/link, but its types predate
// `transitionTypes`, which names the view transition a navigation runs.
export type LinkProps = IntlLinkProps & { transitionTypes?: string[] };

export function Link(props: LinkProps) {
  return <navigation.Link {...(props as IntlLinkProps)} />;
}
