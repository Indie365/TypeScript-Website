import React, { useEffect } from "react"

import "./TopNav.scss"
import { setupStickyNavigation } from "./stickyNavigation";
import { useIntl } from "react-intl";
import { createIntlLink } from "../IntlLink";
import { DocSearch } from '../DocSearch';

export type Props = {
  lang: string
  skipToAnchor?: string
}

import { navCopy } from "../../copy/en/nav"
import { createInternational } from "../../lib/createInternational"
import { OpenInMyLangQuickJump } from "./LanguageRecommendation";

export const SiteNav = (props: Props) => {
  const i = createInternational<typeof navCopy>(useIntl())
  const IntlLink = createIntlLink(props.lang)
  const loadDocSearch = () => {
    const isDev = document.location.host.includes('localhost')
    let customHandleSelected;

    if (isDev) {
      customHandleSelected = (input, event, suggestion, datasetNumber, context) => {
        const urlToOpen = suggestion.url.replace("www.typescriptlang.org", "localhost:8000").replace("https", "http")
        window.open(urlToOpen)
      }
    }

    // @ts-ignore - this comes from the script above
    docsearch({
      appId: "BGCDYOIYZ5",
      apiKey: '37ee06fa68db6aef451a490df6df7c60',
      indexName: 'typescriptlang',
      inputSelector: '.search input',
      handleSelected: customHandleSelected,
    });
  }
  // This extra bit of mis-direction ensures that non-essential code runs after
  // the page is loaded
  useEffect(() => {
    setupStickyNavigation()
  }, []);

  return (
    <header dir="ltr">
      <a className="skip-to-main" href={props.skipToAnchor || '#site-content'} tabIndex={0}>{i("skip_to_content")}</a>

      <div id="top-menu" className="up">
        <div className="left below-small">

          <IntlLink id="home-page-logo" to="/" aria-label="TypeScript Home Page">
            <svg fill="none" height="26" viewBox="0 0 27 26" width="27" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m.98608 0h24.32332c.5446 0 .9861.436522.9861.975v24.05c0 .5385-.4415.975-.9861.975h-24.32332c-.544597 0-.98608-.4365-.98608-.975v-24.05c0-.538478.441483-.975.98608-.975zm13.63142 13.8324v-2.1324h-9.35841v2.1324h3.34111v9.4946h2.6598v-9.4946zm1.0604 9.2439c.4289.2162.9362.3784 1.5218.4865.5857.1081 1.2029.1622 1.8518.1622.6324 0 1.2331-.0595 1.8023-.1784.5691-.1189 1.0681-.3149 1.497-.5879s.7685-.6297 1.0187-1.0703.3753-.9852.3753-1.6339c0-.4703-.0715-.8824-.2145-1.2365-.1429-.3541-.3491-.669-.6186-.9447-.2694-.2757-.5925-.523-.9692-.7419s-.8014-.4257-1.2743-.6203c-.3465-.1406-.6572-.2771-.9321-.4095-.275-.1324-.5087-.2676-.7011-.4054-.1925-.1379-.3409-.2838-.4454-.4379-.1045-.154-.1567-.3284-.1567-.523 0-.1784.0467-.3392.1402-.4824.0935-.1433.2254-.2663.3959-.369s.3794-.1824.6269-.2392c.2474-.0567.5224-.0851.8248-.0851.22 0 .4523.0162.697.0486.2447.0325.4908.0825.7382.15.2475.0676.4881.1527.7218.2555.2337.1027.4495.2216.6475.3567v-2.4244c-.4015-.1514-.84-.2636-1.3157-.3365-.4756-.073-1.0214-.1095-1.6373-.1095-.6268 0-1.2207.0662-1.7816.1987-.5609.1324-1.0544.3392-1.4806.6203s-.763.6392-1.0104 1.0743c-.2475.4352-.3712.9555-.3712 1.5609 0 .7731.2268 1.4326.6805 1.9785.4537.546 1.1424 1.0082 2.0662 1.3866.363.146.7011.2892 1.0146.4298.3134.1405.5842.2865.8124.4378.2282.1514.4083.3162.5403.4946s.198.3811.198.6082c0 .1676-.0413.323-.1238.4662-.0825.1433-.2076.2676-.3753.373s-.3766.1879-.6268.2473c-.2502.0595-.5431.0892-.8785.0892-.5719 0-1.1383-.0986-1.6992-.2959-.5608-.1973-1.0805-.4933-1.5589-.8879z" fill="#fff" fillRule="evenodd" /></svg>
            <span className="hide-small">TypeScript</span>
          </IntlLink>

          <nav role="navigation">
            <ul role="tablist" aria-owns="tab1 tab2 tab3 tab4 tab5 tab6" aria-busy="true">
            <li className="nav-item hide-small" role="none presentation" ><IntlLink id="tab1" role="tab" to="/download">{i("nav_download")}</IntlLink></li>
              <li className="nav-item" role="none presentation"><IntlLink id="tab2" role="tab" to="/docs/"><span>{i("nav_documentation_short")}</span></IntlLink></li>
              <li className="nav-item show-only-large" role="none presentation"><IntlLink id="tab3" role="tab" to="/docs/handbook/intro.html">{i("nav_handbook")}</IntlLink></li>
              <li className="nav-item" role="none presentation"><IntlLink id="tab4" role="tab" to="/community">{i("nav_community")}</IntlLink></li>
              <li className="nav-item show-only-largest" role="none presentation"><IntlLink id="tab5" role="tab" to="/play">{i("nav_playground")}</IntlLink></li>
              <li className="nav-item" role="none presentation"><IntlLink id="tab6" role="tab" to="/tools">{i("nav_tools")}</IntlLink></li>
            </ul>
          </nav>

        </div>


        <div className="right above-small">
          <div className="search-section">
            <OpenInMyLangQuickJump />
            <div className="nav-item">
              <DocSearch
                  apiKey="3c2db2aef0c7ff26e8911267474a9b2c"
                  indexName="typescriptlang"
                  appId="BH4D9OD16A"
                />
            </div>
          </div>
        </div>
      </div>

      <div id="site-content" />
    </header >
  )
}
