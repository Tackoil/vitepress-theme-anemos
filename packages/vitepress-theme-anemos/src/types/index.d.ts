export type AnemosLink = {
  title: string;
  intro?: string;
  link: string;
  avatar?: string;
};

export type AnemosConfig = {
  navs: { name: string; path: string; icon: string }[];
  subtitle: string;
  headpic?: string;
  indent?: boolean;
};

export type AnemosFrontmatter = {
  title: string;
  date: string;
  description: string;
  headpic?: string;
  indent?: boolean;
  links?: AnemosLink[];
  hide?: boolean;
};

export type AnemosPost = {
  path: string;
  title: string;
  frontmatter: Partial<AnemosFrontmatter> & Record<string, unknown>;
};

export declare function defineAnemosConfig(config: AnemosConfig): AnemosConfig;

export declare function createAnemosPostLoader(pattern?: string | string[]): {
  watch: string | string[];
  load: () => Promise<AnemosPost[]>;
};
