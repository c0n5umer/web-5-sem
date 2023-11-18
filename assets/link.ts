const isHomePage = (url: string) => {
  const name = url.split("/").at(-1);

  return name === "" || name === "index.html";
};

const areUrlsEqual = (at: string, url: string) => {
  if (isHomePage(at) && isHomePage(url)) {
    return true;
  }

  return at === url;
};

const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("nav a");

for (const link of links) {
  if (areUrlsEqual(window.location.pathname, link.pathname)) {
    link.classList.add("active");
  }
}
