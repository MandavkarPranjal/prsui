import { CommandBox } from "@/components/command-box";
import { HomeCtas } from "@/components/home-ctas";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

export default function IndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
      <PageTransition>
        <section className="container-wrapper relative flex flex-1 flex-col">
          <div className="container flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="text-foreground">prsui</span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
              ui-library with a growing library of ready-to-use react components
              & microinteractions. free &amp; open source.
            </p>

            <CommandBox className="mt-2 w-full max-w-xl" />

            <HomeCtas className="mt-2" />
          </div>
        </section>
      </PageTransition>
    </>
  );
}
