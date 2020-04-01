import React from "react";

import {
    RouteViewWrapper,
    RouteViewHeader,
    MapHolder,
    ExpandButton,
    CollapseButton,
    RouteInfoContainer,
    LeftPanel,
    RightPanel,
    MediaModal,
    SelectedImage,
    ImageContainer,
} from "./route-view.style";

import { RouteColor as colors } from "@constants";
import { Map, LocationMenu, WaypointsDropdown, RouteElements } from "./children";
import { useTranslation } from "react-i18next";
import { useWebId } from "@inrupt/solid-react-components";

import { RouteMapContext } from "@components/RouteMap/route-map.component";

import { modal, MobileCompatWrapper, ModalCloseButton } from "@utils";

export const RouteViewContext = React.createContext();

const comments = [
    { content: "Comentario 1", author: "Labra" },
    { content: "Comentario 2", author: "Jesus" },
    { content: "Comentario 3", author: "Marcos" },
    { content: "Comentario 4", author: "Marcos" },
    {
        content:
            "Comentario 5 muyyyyyyyyyyyyyyyyyy lagroooooooooooooooooooooo sklfhsnkf sdklf shfk shnfksdh fdks fhsdjkfhsdkf shkfds hfkds fhsdkfdskjfh skf shfkds hfskjf hksjd f",
        author: "Marcos"
    },
    { content: "Comentario 6", author: "Marcos" },
    { content: "Comentario 6", author: "Marcos" },
    { content: "Comentario 6", author: "Marcos" },
    { content: "Comentario 6", author: "Marcos" }
];

const files = [
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://alejandroleon98.github.io/multi/file3.zip" },
    {
        link: "https://live.staticflickr.com/65535/49693057273_67d37d186b_b.jpg"
    },
    { link: "https://live.staticflickr.com/380/18621040808_7434daf21f_b.jpg" },
    { link: "https://live.staticflickr.com/8578/16001301710_90ea0a7660_b.jpg" },
    { link: "https://alejandroleon98.github.io/multi/file4.7z" },
    {
        link: "https://live.staticflickr.com/65535/33684346828_7e6958e09b_b.jpg"
    },
    { link: "https://live.staticflickr.com/274/19983881105_e93c2d8279_b.jpg" },
    { link: "https://live.staticflickr.com/755/22922331760_97592547a8_b.jpg" },
    { link: "https://live.staticflickr.com/7285/16457569501_dbfb5046d3_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://alejandroleon98.github.io/multi/file5.rar" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://alejandroleon98.github.io/multi/file2.txt" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://alejandroleon98.github.io/multi/file1.txt" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    {
        link:
            "https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BDC86F44B-A7FF-0BC2-C969-BE37F90B0611%7D%26lang%3Den%26browser%3D3%26usagestats%3D0%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe"
    }
];

const RouteView = ({ route, closeRouteView }) => {
    const webId = useWebId();

    const points = route.waypoints;

    const { t } = useTranslation();

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

    const [collapsed, setCollapsed] = React.useState(false);
    const [selectedPoint, setSelectedPoint] = React.useState(null);

    const map = React.useRef();

    points.forEach((point, index) => (point.color = colors[index % colors.length]));

    const onPointSelect = (point, index) => {
        const newPoint = selectedPoint === index ? null : index;
        setSelectedPoint(newPoint);
        if (newPoint !== null) map.current.panTo(point);
    };

    const [MediaViewModal, openMediaView, closeMediaView] = modal("route-map");
    const [MediaViewModalFile, openMediaViewFile, closeMediaViewFile] = modal("route-map");
    const [selectedMedia, setSelectedMedia] = React.useState(null);

    return (
        <MobileCompatWrapper>
            <RouteViewWrapper>
                <ModalCloseButton onClick={closeRouteView} />

                <MediaViewModal>
                    <ModalCloseButton onClick={closeMediaViewFile} />
                    <ImageContainer>
                        <SelectedImage src={selectedMedia} onClick={closeMediaView} />
                    </ImageContainer>
                </MediaViewModal>

                <MediaViewModalFile>
                    <MediaModal>
                        <ModalCloseButton onClick={closeMediaViewFile} />
                        <h2>{t("route.file")}</h2>
                        <p>
                            {t("route.source")} {selectedMedia}
                        </p>
                        <p>{t("route.clickToDownload")}</p>
                        <a href={selectedMedia} download>
                            <img style={{ height: '2em' }} src="img/icon/download.svg" alt="download file" />
                        </a>
                    </MediaModal>
                </MediaViewModalFile>

                <RouteInfoContainer>
                    <RouteViewContext.Provider value={{ selectedPoint, setSelectedPoint, onPointSelect }}>
                        
                        <LeftPanel {...{ collapsed }}>
                            {collapsed && <ExpandButton onClick={() => setCollapsed(false)}>⇠</ExpandButton>}

                            <Map
                                {...{ route }}
                                mapRef={map}
                                data-testid="route-map"
                                googleMapURL={googleMapURL}
                                loadingElement={<MapHolder />}
                                containerElement={<MapHolder />}
                                mapElement={<MapHolder />}
                            />

                            <RouteElements
                                  {...{ comments, files, webId, route}} 
                            />

                        </LeftPanel>

                        <RightPanel {...{ collapsed }}>
                            <RouteViewHeader>
                                {!collapsed && <CollapseButton onClick={() => setCollapsed(true)}>⇢</CollapseButton>}
                                <h1>{route.name}</h1>
                                <RouteMapContext.Consumer>
                                    {props =>
                                        props.myRoutes && (
                                            <div>
                                                <button onClick={() => props.onDeleteClick(route.id)}>
                                                    {t("route.delete")}
                                                </button>
                                                <button onClick={() => props.onPublishClick(route.id)}>
                                                    {t("route.publish")}
                                                </button>
                                            </div>
                                        )
                                    }
                                </RouteMapContext.Consumer>
                            </RouteViewHeader>

                            <LocationMenu {...{ points }} />

                        </RightPanel>

                    </RouteViewContext.Provider>
                </RouteInfoContainer>
            
            </RouteViewWrapper>
        </MobileCompatWrapper>
    );
};


//<WaypointsDropdown {...{ points }}/>

export default RouteView;
