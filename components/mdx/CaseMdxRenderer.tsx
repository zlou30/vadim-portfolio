import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

import { caseMdxComponents } from "./CaseMdxComponents";

type CaseMdxRendererProps = {
  source: string;
};

export async function CaseMdxRenderer({ source }: CaseMdxRendererProps) {
  /**
   * evaluate допустим здесь, потому что MDX хранится
   * локально в репозитории и считается доверенным.
   * Пользовательский ввод в компилятор не передаётся.
   */
  const { default: MdxContent } = await evaluate(source, {
    ...runtime,
    baseUrl: import.meta.url,
    remarkPlugins: [remarkGfm],
  });

  return (
    <div className={["min-w-0", "[&>:first-child]:!mt-0"].join(" ")}>
      <MdxContent components={caseMdxComponents} />
    </div>
  );
}
