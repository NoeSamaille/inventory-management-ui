import React from "react";
import {
    HeaderContainer, Header, SkipToContent, HeaderMenuButton, HeaderName,
    HeaderNavigation, HeaderMenu, HeaderMenuItem, HeaderGlobalBar,
    HeaderGlobalAction, SideNav, SideNavItems, Content,
    SideNavMenu, SideNavMenuItem, SideNavLink,
    StructuredListWrapper, StructuredListHead, StructuredListRow,
    StructuredListCell, StructuredListBody, StructuredListSkeleton
} from 'carbon-components-react';
import {
    Notification20,
    Search20,
    AppSwitcher20,
    Fade16,
} from '@carbon/icons-react';
import ErrorBoundary from './ErrorBoundary';


class UIShell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            items: [
                {
                    "name": "Item 1",
                    "description": "The first item",
                    "stock": 10,
                    "unitPrice": 100.0,
                    "picture": "test",
                    "manufacturer": "unknown",
                },
                {
                    "name": "Item 2",
                    "description": "The second item",
                    "stock": 15,
                    "unitPrice": 120.5,
                    "picture": "test1",
                    "manufacturer": "Apple",
                },
                {
                    "name": "Item 3",
                    "description": "The third item",
                    "stock": 20,
                    "unitPrice": 75.5,
                    "picture": "test1",
                    "manufacturer": "Sony",
                }
            ]
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch('/api/stock-items')
            .then(res => res.json())
            .then(res => {
                this.setState({ items: res, loading: false })
            })
            .catch((e) => {
                console.error(e);
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <div>
                <HeaderContainer
                    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                        <>
                            <Header aria-label="IBM Platform Name">
                                <SkipToContent />
                                <HeaderMenuButton
                                    aria-label="Open menu"
                                    onClick={onClickSideNavExpand}
                                    isActive={isSideNavExpanded}
                                />
                                <HeaderName href="#" prefix="Inventory">
                                    Management
                                </HeaderName>
                                <HeaderNavigation aria-label="Inventory Management">
                                    <HeaderMenuItem href="#">Contributing</HeaderMenuItem>
                                    <HeaderMenuItem href="#">Contact</HeaderMenuItem>
                                    <HeaderMenu aria-label="How To" menuLinkName="How To">
                                        <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                                        <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                                        <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
                                    </HeaderMenu>
                                </HeaderNavigation>
                                <HeaderGlobalBar>
                                    <HeaderGlobalAction
                                        aria-label="Search">
                                        <Search20 />
                                    </HeaderGlobalAction>
                                    <HeaderGlobalAction
                                        aria-label="Notifications">
                                        <Notification20 />
                                    </HeaderGlobalAction>
                                    <HeaderGlobalAction
                                        aria-label="App Switcher"
                                        tooltipAlignment="end">
                                        <AppSwitcher20 />
                                    </HeaderGlobalAction>
                                </HeaderGlobalBar>
                                <ErrorBoundary>
                                    <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                                        <SideNavItems>
                                            <SideNavLink renderIcon={Fade16} href="#">
                                                Overview
                                            </SideNavLink>
                                            <SideNavMenu renderIcon={Fade16} title="Inventory" defaultExpanded>
                                                <SideNavMenuItem aria-current="page" href="#">
                                                    Items
                                                </SideNavMenuItem>
                                            </SideNavMenu>
                                            <SideNavMenu renderIcon={Fade16} title="Management">
                                                <SideNavMenuItem href="#">
                                                    Link
                                                </SideNavMenuItem>
                                                <SideNavMenuItem href="#">
                                                    Link
                                                </SideNavMenuItem>
                                                <SideNavMenuItem href="#">
                                                    Link
                                                </SideNavMenuItem>
                                            </SideNavMenu>
                                            <SideNavMenu
                                                renderIcon={Fade16}
                                                title="Docs">
                                                <SideNavMenuItem href="#">
                                                    Link
                                                </SideNavMenuItem>
                                                <SideNavMenuItem href="#">
                                                    Link
                                                </SideNavMenuItem>
                                            </SideNavMenu>
                                        </SideNavItems>
                                    </SideNav>
                                </ErrorBoundary>
                            </Header>
                        </>
                    )}
                />
                <Content className="content">
                    {this.state.loading ? <StructuredListSkeleton /> :
                        <StructuredListWrapper>
                            <StructuredListHead>
                                <StructuredListRow head>
                                    <StructuredListCell head>Name</StructuredListCell>
                                    <StructuredListCell head>Description</StructuredListCell>
                                    <StructuredListCell head>Stock</StructuredListCell>
                                    <StructuredListCell head>Unit Price</StructuredListCell>
                                    <StructuredListCell head>Manufacturer</StructuredListCell>
                                </StructuredListRow>
                            </StructuredListHead>
                            <StructuredListBody>
                                {this.state.items.map(item => (
                                    <StructuredListRow>
                                        <StructuredListCell noWrap>{item.name}</StructuredListCell>
                                        <StructuredListCell noWrap>{item.description}</StructuredListCell>
                                        <StructuredListCell noWrap>{item.stock}</StructuredListCell>
                                        <StructuredListCell noWrap>{item.unitPrice}</StructuredListCell>
                                        <StructuredListCell noWrap>{item.manufacturer}</StructuredListCell>
                                    </StructuredListRow>
                                ))}
                            </StructuredListBody>
                        </StructuredListWrapper>
                    }
                </Content>
            </div>
        );
    }
}

export default UIShell;
