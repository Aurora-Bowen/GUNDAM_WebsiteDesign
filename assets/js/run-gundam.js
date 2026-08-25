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
      href: "https://gundam-organization.github.io/gundam/configuration/LikelihoodInterface.html"
    },
    {
      type: "link",
      key: "propagator",
      label: "Propagator",
      href: "https://gundam-organization.github.io/gundam/configuration/Propagator.html"
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
      key: "minimizer",
      label: "Minimizer",
      href: "#"
    }
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