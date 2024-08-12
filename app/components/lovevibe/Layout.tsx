import type {ThemeConfig} from 'antd';
import {Await, useLocation} from '@remix-run/react';
import {Suspense, useEffect, useState} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Header} from '~/components/lovevibe/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {ConfigProvider} from '../ConfigProvider';
import {THEME} from '~/constants';
import {getRouteFromPath} from '~/utils';
import {PageLoading} from '../ui';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  theme?: ThemeConfig;
};

export function Layout(props: LayoutProps) {
  const {cart, children = null, footer, header, isLoggedIn} = props || {};

  const location = useLocation();
  const routeInfo = getRouteFromPath(location.pathname);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (routeInfo?.themeKey) {
      document
        .querySelector('html')
        ?.setAttribute('data-theme', routeInfo?.themeKey);
    }
  }, [routeInfo?.themeKey]);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, []);

  if (!showContent) return <PageLoading logoUrl={routeInfo?.logo} />;

  return (
    <ConfigProvider theme={routeInfo?.theme || THEME}>
      {/* <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside menu={header?.menu} shop={header?.shop} /> */}
      <PageLoading logoUrl={routeInfo?.logo} />
      {header && <Header logo={routeInfo?.logo} />}
      <main>{children}</main>
      {/* <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
        </Await>
      </Suspense> */}
    </ConfigProvider>
  );
}

function CartAside({cart}: {cart: LayoutProps['cart']}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

// function MobileMenuAside({
//   menu,
//   shop,
// }: {
//   menu: HeaderQuery['menu'];
//   shop: HeaderQuery['shop'];
// }) {
//   return (
//     menu &&
//     shop?.primaryDomain?.url && (
//       <Aside id="mobile-menu-aside" heading="MENU">
//         <HeaderMenu
//           menu={menu}
//           viewport="mobile"
//           primaryDomainUrl={shop.primaryDomain.url}
//         />
//       </Aside>
//     )
//   );
// }
