document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("run-doc-sidebar");

  if (!sidebar) return;

  const currentPage = document.body.dataset.runDocPage || "";

  const navItems = [
    {
      type: "link",
      key: "overview",
      label: "Overview",
      href: "run-gundam.html"
    },

    {
      type: "group",
      label: "Main Workflows"
    },
    {
      type: "link",
      key: "gundam-fitter",
      label: "gundamFitter",
      href: "gundam-fitter.html"
    },
    {
      type: "link",
      key: "gundam-calc-xsec",
      label: "gundamCalcXsec",
      href: "https://gundam-organization.github.io/gundam/applications/gundamCalcXsec.html"
    },

    {
      type: "group",
      label: "Configuration Utilities"
    },
    {
      type: "link",
      key: "config-unfolder",
      label: "Config Unfolder",
      href: "run-gundam.html#configuration-utilities"
    },
    {
      type: "link",
      key: "config-compare",
      label: "Config Compare",
      href: "run-gundam.html#configuration-utilities"
    },
    {
      type: "link",
      key: "input-zipper",
      label: "Input Zipper",
      href: "run-gundam.html#configuration-utilities"
    },

    {
      type: "group",
      label: "Fit Output Utilities"
    },
    {
      type: "link",
      key: "fit-reader",
      label: "Fit Reader",
      href: "run-gundam.html#fit-output-utilities"
    },
    {
      type: "link",
      key: "fit-compare",
      label: "Fit Compare",
      href: "run-gundam.html#fit-output-utilities"
    },
    {
      type: "link",
      key: "fit-plot",
      label: "Fit Plot",
      href: "run-gundam.html#fit-output-utilities"
    },
    {
      type: "link",
      key: "plot-extractor",
      label: "Plot Extractor",
      href: "run-gundam.html#fit-output-utilities"
    },

    {
      type: "group",
      label: "Configuration Reference"
    },
    {
  type: "link",
  key: "fitter-engine",
  label: "Fitter Engine",
  href: "fitter-engine.html"
},
{
  type: "link",
  key: "likelihood",
  label: "Likelihood",
  href: "likelihood.html"
},
{
  type: "link",
  key: "propagator",
  label: "Propagator",
  href: "propagator.html"
},
{
  type: "link",
  key: "samples",
  label: "Samples",
  href: "samples.html",
  level: 1
},
{
  type: "link",
  key: "parameters",
  label: "Parameters",
  href: "parameters.html",
  level: 1
},
{
  type: "link",
  key: "dials",
  label: "Dials",
  href: "dials.html",
  level: 2
},
{
  type: "link",
  key: "tabulated-dials",
  label: "Tabulated Dials",
  href: "tabulated-dials.html",
  level: 3
},
{
  type: "link",
  key: "kriged-dials",
  label: "Kriged Dials",
  href: "kriged-dials.html",
  level: 3
},
{
  type: "link",
  key: "minimizer",
  label: "Minimizer",
  href: "minimizer.html"
},
{
  type: "link",
  key: "simple-mcmc",
  label: "Simple MCMC",
  href: "simple-mcmc.html",
  level: 1
},
{
  type: "link",
  key: "parameter-scanner",
  label: "Parameter Scanner",
  href: "parameter-scanner.html"
},
{
  type: "link",
  key: "simple-mcmc",
  label: "Simple MCMC",
  href: "simple-mcmc.html",
  level: 1
},
  ];

  const sticky = document.createElement("div");
  sticky.className = "run-doc-sticky";

  const heading = document.createElement("p");
  heading.className = "run-doc-heading";
  heading.textContent = "RUN GUNDAM";

  const nav = document.createElement("nav");
  nav.className = "run-doc-nav";
  nav.setAttribute("aria-label", "Run GUNDAM navigation");

  navItems.forEach((item) => {
    if (item.type === "group") {
      const group = document.createElement("p");
      group.className = "run-doc-group";
      group.textContent = item.label;
      nav.appendChild(group);
      return;
    }

    const link = document.createElement("a");

    link.href = item.href;
    link.textContent = item.label;

    if (item.key === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

    if (item.level) {
      link.classList.add(`run-doc-level-${item.level}`);
    }

    nav.appendChild(link);
  });

  sticky.appendChild(heading);
  sticky.appendChild(nav);
  sidebar.appendChild(sticky);

  const activeItem = sidebar.querySelector(".active");

  if (activeItem) {
    activeItem.scrollIntoView({
      block: "nearest"
    });
  }
});

  /* ======================================================
     ON THIS PAGE - Scroll Spy
     Highlight the section currently visible in the page.
     ====================================================== */

  const toc = document.querySelector(
    ".run-doc-toc .run-doc-nav"
  );

  if (toc) {

    const tocLinks = Array.from(
      toc.querySelectorAll('a[href^="#"]')
    );

    const sections = tocLinks
      .map((link) => {
        const id = link
          .getAttribute("href")
          .substring(1);

        return document.getElementById(id);
      })
      .filter(Boolean);


    const setActiveTocLink = (sectionId) => {

      tocLinks.forEach((link) => {

        const linkTarget = link
          .getAttribute("href")
          .substring(1);

        link.classList.toggle(
          "toc-active",
          linkTarget === sectionId
        );

      });

    };


    const updateToc = () => {

      if (!sections.length) return;

      /*
       * Offset accounts for the fixed website header.
       * Increase/decrease this value if the active section
       * changes too early or too late.
       */
      const scrollPosition =
        window.scrollY + 180;

      let currentSection = sections[0];

      sections.forEach((section) => {

        const sectionTop =
          section.getBoundingClientRect().top
          + window.scrollY;

        if (sectionTop <= scrollPosition) {
          currentSection = section;
        }

      });


      /*
       * When the user reaches the bottom of the page,
       * make sure the final section becomes active.
       */
      const nearBottom =
        window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 20;

      if (nearBottom) {
        currentSection =
          sections[sections.length - 1];
      }


      setActiveTocLink(currentSection.id);

    };


    /*
     * Run once when the page loads.
     */
    updateToc();


    /*
     * Update while scrolling.
     */
    window.addEventListener(
      "scroll",
      updateToc,
      { passive: true }
    );


    /*
     * Update after window resizing as section positions
     * may change.
     */
    window.addEventListener(
      "resize",
      updateToc
    );

  }