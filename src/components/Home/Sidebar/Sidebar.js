import React from 'react'
import sidebarModule from './Sidebar.module.css'
import {
    OrdersMajor
} from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';
import {
    HomeMajor
} from '@shopify/polaris-icons';
import {
    ProductsMajor
} from '@shopify/polaris-icons';
import {
    CustomersMajor
} from '@shopify/polaris-icons';
import {
    AnalyticsMajor
} from '@shopify/polaris-icons';
import {
    MarketingMajor
} from '@shopify/polaris-icons';
import {
    DiscountsMajor
} from '@shopify/polaris-icons';
import {
    AppsMajor
} from '@shopify/polaris-icons';
import {
    StoreMajor
} from '@shopify/polaris-icons';
import {
    PointOfSaleMajor
} from '@shopify/polaris-icons';
import {
    CirclePlusMajor
} from '@shopify/polaris-icons';
import {
    SettingsMajor
} from '@shopify/polaris-icons';


export default function Sidebar() {
    return (
        <div className={sidebarModule.sidebarContainer}>
            <div className={sidebarModule.topOptions}>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={HomeMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Home
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={OrdersMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Orders
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={ProductsMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Products
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={CustomersMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Customers
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={AnalyticsMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Analytics
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={MarketingMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Marketing
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={DiscountsMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Discounts
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={AppsMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Apps
                    </p>
                </div>
            </div>

            <div className={sidebarModule.middleOptions}>
                <div className={sidebarModule.middleHeader}>
                    <p className={sidebarModule.middleHeading}>
                        SALES CHANNELS
                    </p>
                    <p className={sidebarModule.middleHeadingIcon}>
                        <Icon
                            source={CirclePlusMajor}
                            color="base"
                        />
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={StoreMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Online Store
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={PointOfSaleMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Point of Sale
                    </p>
                </div>
                <div className={sidebarModule.eachSidebarDiv}>
                    <p className={sidebarModule.icons}>
                        <Icon
                            source={StoreMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.option}>
                        Amazon by CedCommerce
                    </p>
                </div>
                <div className={sidebarModule.eachMiddleFaded}>
                    <p className={sidebarModule.iconsFaded}>
                        <Icon
                            source={StoreMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.optionfaded}>
                        Overview
                    </p>
                </div>
                <div className={sidebarModule.eachMiddleFaded}>
                    <p className={sidebarModule.iconsFaded}>
                        <Icon
                            source={StoreMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.optionfaded}>
                        Listings
                    </p>
                </div>
                <div className={sidebarModule.eachMiddleFaded}>
                    <p className={sidebarModule.iconsFaded}>
                        <Icon
                            source={StoreMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.optionfaded}>
                        Product Linking
                    </p>
                </div>
                <div className={sidebarModule.eachMiddleFaded}>
                    <p className={sidebarModule.iconsFaded}>
                        <Icon
                            source={StoreMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.optionfaded}>
                        Settings
                    </p>
                </div>
                <div className={sidebarModule.eachMiddleFaded}>
                    <p className={sidebarModule.iconsFaded}>
                        <Icon
                            source={StoreMajor}
                            color="base"
                        />
                    </p>
                    <p className={sidebarModule.optionfaded}>
                        FAQ
                    </p>
                </div>
            </div>

            <div className={sidebarModule.bottomOption}>
                <p className={sidebarModule.icons}>
                    <Icon
                        source={SettingsMajor}
                        color="base"
                    />
                </p>
                <p className={sidebarModule.option}>
                    Settings
                </p>
            </div>
        </div>
    )
}
