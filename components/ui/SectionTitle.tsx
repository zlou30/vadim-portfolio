type SectionTitleProps = {
  title: string;
  description?: string;
};

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
