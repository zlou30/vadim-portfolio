import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-16">
      <Container className="max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Ошибка 404
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Страница не найдена
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
          Возможно, адрес указан неправильно или такой проект ещё не добавлен в
          данные сайта.
        </p>

        <div className="mt-8">
          <Button href="/">Вернуться на главную</Button>
        </div>
      </Container>
    </section>
  );
}
