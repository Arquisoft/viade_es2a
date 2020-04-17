import React from "react";
import {
    Points,
    RouteViewHeader,
    RouteOptionButton,
    DeleteConfirmation
} from "./route-points.style";

import { LocationMenu } from "./..";
import { useTranslation } from "react-i18next";
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import { ConfirmationDialog } from '@util-components';
import { modal } from "@utils";

const RoutePoints = ({ route, distance }) => {
    const { t } = useTranslation();

    const [DeleteModal, openDelete, closeDelete] = modal("route-map");
    const [deleting, setDeleting] = React.useState(null);

    const onDeleteResult = async (result) => {
        closeDelete();
        if (result)
            await deleting.onDeleteClick(route.id);
        setDeleting(null);
    };

    const onDeleteClick = (onDelete) => {
        setDeleting(onDelete);
        openDelete();
    };

    return (
        <Points>

            <RouteViewHeader>
                <h1 name={route.name}>{route.name}</h1>

                {distance && <p>{distance}</p>}
                <p name={route.description}>{route.description}</p>

                <RouteMapContext.Consumer>
                    {props =>
                        props.myRoutes && (
                            <div style={{ display: 'flex', placeContent: 'center' }}>
                                <RouteOptionButton onClick={() => onDeleteClick(props)} name="delete-route-button">
                                    <img src='img/icon/bin.svg' alt={t("route.delete")}></img>
                                </RouteOptionButton>
                                <RouteOptionButton onClick={() => props.onPublishClick(route.id)} name="publish-route-button">
                                    <img src='img/icon/share.svg' alt={t("route.share")}></img>
                                </RouteOptionButton>
                                <RouteOptionButton onClick={() => props.onEditClick(route.id)} name="edit-route-button">
                                    <img src='img/icon/edit.svg' alt={t("route.edit.action")}></img>
                                </RouteOptionButton>
                            </div>
                        )
                    }
                </RouteMapContext.Consumer>
            </RouteViewHeader>

            <LocationMenu {...{ trackpoints: route.points, waypoints: route.waypoints }} />

            <DeleteModal>
                <DeleteConfirmation id='delete-modal'>
                    <ConfirmationDialog
                        onAccept={() => onDeleteResult(true)}
                        onDecline={onDeleteResult}
                        options={{ message: t('route.edit.delete') }}
                        parentSelector='#delete-modal' />
                </DeleteConfirmation>
            </DeleteModal>

        </Points>
    );
};

export default RoutePoints;