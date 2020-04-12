import React from "react";

import {
    DownPanel,
    TabContainer,
    TabButton,
    PanelContainer
} from "./route-elements.style";

import { useTranslation } from "react-i18next";
import { Comments } from "./children";

import { Multimedia } from "@components";

const RouteElements = ({ webId, route, downPanelCollapsed, setDownPanelCollapsed }) => {

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

    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabs = ["route.comments", "route.multimedia"];

    return (
        <DownPanel {...{ downPanelCollapsed }}>
            <TabContainer>
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
            </TabContainer>
            <PanelContainer {...{ downPanelCollapsed }}>
                {selectedTab ?
                    <Multimedia {...{ files: route.media }} />
                    :
                    <Comments {...{ webId, route }} />
                }
            </PanelContainer>
        </DownPanel>
    );
};

export default RouteElements;