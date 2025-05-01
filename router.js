export class Router {
  constructor({ routes, rootId, hideHeaderOnPaths = [], hideFooterOnPaths = [] }) {
    this.routes = routes; // { "/": "home-page", "/user/:id": "user-page" }
    this.root = document.getElementById(rootId);
    this.routeMatchers = this.compileRoutes(routes);
    this.hideHeaderOnPaths = hideHeaderOnPaths; // Paths where header should be hidden
    this.hideFooterOnPaths = hideFooterOnPaths; // Paths where footer should be hidden
    this.handleClick = this.handleClick.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.init();
  }

  compileRoutes(routes) {
    // Convert "/user/:id" into regex and extract param names
    return Object.entries(routes).map(([path, component]) => {
      const paramNames = [];
      const regexPath = path.replace(/:([\w]+)/g, (_, key) => {
        paramNames.push(key);
        return '([^\\/]+)';
      });
      const matcher = new RegExp(`^${regexPath}$`);
      return { matcher, paramNames, component };
    });
  }

  matchRoute(path) {
    for (const { matcher, paramNames, component } of this.routeMatchers) {
      const match = path.match(matcher);
      if (match) {
        const params = {};
        paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });
        return { component, params };
      }
    }
    return null;
  }

  shouldShowHeader(path) {
    return !this.pathMatchesAny(path, this.hideHeaderOnPaths);
  }

  shouldShowFooter(path) {
    return !this.pathMatchesAny(path, this.hideFooterOnPaths);
  }

  pathMatchesAny(path, patterns) {
    for (const pattern of patterns) {
      if (pattern === path) return true;
      
      if (pattern.endsWith('*')) {
        const prefix = pattern.slice(0, -1);
        if (path.startsWith(prefix)) return true;
      }
    }
    return false;
  }

  render(path) {
    const match = this.matchRoute(path);
    if (!match) {
      this.root.innerHTML = `<h1>404 Not Found</h1>`;
      return;
    }

    const { component, params } = match;
    this.root.innerHTML = '';
    const el = document.createElement(component);
    el.routeParams = params; // Pass params to the custom element
    this.root.appendChild(el);

    const header = document.querySelector('nav-bar');
    if (header) {
      header.style.display = this.shouldShowHeader(path) ? 'block' : 'none';
    }

    const footer = document.querySelector('my-footer');
    if (footer) {
      footer.style.display = this.shouldShowFooter(path) ? 'block' : 'none';
    }
  }

  navigate(path) {
    history.pushState({}, '', path);
    this.render(path);
  }

  handleClick(event) {
    const anchor = event.target.closest('a');
    if (
      anchor &&
      anchor.origin === location.origin &&
      anchor.hasAttribute('data-link')
    ) {
      event.preventDefault();
      const path = anchor.getAttribute('href');
      this.navigate(path);
    }
  }

  handlePopState() {
    this.render(location.pathname);
  }

  init() {
    document.addEventListener('click', this.handleClick);
    window.addEventListener('popstate', this.handlePopState);
    this.render(location.pathname);
  }
}
