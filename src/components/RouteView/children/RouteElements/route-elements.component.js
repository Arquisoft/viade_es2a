import React from "react";

import {
    DownPanel,
    Header,
    TabButton,
    PanelContainer
} from "./../../route-view.style";

import { useTranslation } from "react-i18next";
import { Comments, Multimedia } from "./children";

const RouteElements = ({ comments, files, webId, route, closeRouteView, downPanelCollapsed, setDownPanelCollapsed }) => {

    const { t } = useTranslation();

    const onTabSelect = index => {
        if (downPanelCollapsed) {
            setDownPanelCollapsed(false);
            setSelectedTab(index);
        } else {
            if (selectedTab === index) {
                setDownPanelCollapsed(true);
            } else {
                setSelectedTab(index);
            }
        }
    };

    //Pestañas de multimedia y comentarios
    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabs = ["route.comments", "route.multimedia"];



    return (
        <DownPanel {...{ downPanelCollapsed }}>
            <Header>
                {tabs.map((name, i) => {
                    return (
                        <TabButton
                            selected={selectedTab === i}
                            key={i}
                            onClick={() => onTabSelect(i)}
                        >
                            {t(name)}
                        </TabButton>
                    );
                })}
            </Header>
            <PanelContainer {...{ downPanelCollapsed }}>
                {selectedTab ?
                    (
                        <Multimedia {...{ files, closeRouteView }} />
                    ) :
                    (
                        <Comments {...{ comments, webId, route }} />
                    )}
            </PanelContainer>
        </DownPanel>
    );
};

export default RouteElements;