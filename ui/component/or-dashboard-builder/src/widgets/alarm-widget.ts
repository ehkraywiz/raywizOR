import {css, html, PropertyValues, TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";
import {OrAssetWidget} from "../util/or-asset-widget";
import {WidgetManifest} from "../util/or-widget";
import {WidgetConfig} from "../util/widget-config";
import {WidgetSettings} from "../util/widget-settings";
import "@openremote/or-mwc-components/or-mwc-table";
import {OrMwcTableRowClickEvent, TableColumn, TableConfig, TableRow} from "@openremote/or-mwc-components/or-mwc-table";
import {i18next} from "@openremote/or-translate";
import manager from "@openremote/core";
import {Alarm, AlarmAssetLink, AlarmStatus, SentAlarm} from "@openremote/model";
import { state } from "lit/decorators.js";

// ---------------- CONFIG ----------------
export interface AlarmWidgetConfig extends WidgetConfig {
    tableOptions: number[];

}
interface AlarmModel extends SentAlarm {
    loaded?: boolean;
    loading?: boolean;
    alarmAssetLinks?: AlarmAssetLink[];
    previousAssetLinks?: AlarmAssetLink[];
}

function getDefaultWidgetConfig(): AlarmWidgetConfig {
    return {tableOptions: []};
}

//TODO: Fiks overflow
const styling = css`
    #widget-container {
        height: 100%;
        overflow: scroll;
    }
    
    :host {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important; /* CRITICAL for flex children */
    }
    .mdc-data-table {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important;
    }
    .mdc-data-table__table-container {
        flex: 1 1 auto !important;
        overflow: auto !important;
        min-height: 0 !important;
    }    
`


//TODO: Flytt settings fra bånn av widget inn i settings fane & fiks overflow
// ---------------- WIDGET ----------------
@customElement("alarm-widget")
export class AlarmWidget extends OrAssetWidget {

    protected readonly widgetConfig!: AlarmWidgetConfig;

    static get styles() {
        return [...super.styles, styling];
    }


    static getManifest(): WidgetManifest {
        return {
            displayName: "Alarm Widget",
            displayIcon: "alarm-light",
            minColumnWidth: 2,
            minColumnHeight: 2,
            getContentHtml(config: AlarmWidgetConfig): OrAssetWidget {
                return new AlarmWidget(config);
            },
            getSettingsHtml(config: AlarmWidgetConfig): WidgetSettings {
                return new AlarmWidgetSettings(config);
            },
            getDefaultConfig(): AlarmWidgetConfig {
                return getDefaultWidgetConfig();
            }
        };
    }
    @state()
    private alarms: AlarmModel[] = [];

    public async refreshContent(force: boolean) {
        const mgr = manager;
        const realm = mgr.displayRealm;
        const response = await mgr.rest.api.AlarmResource.getAlarms({realm}, undefined, );
        const tempAlarms = response.data as AlarmModel[];
        const alarmList:AlarmModel[] = []
        for(const alarm of tempAlarms) {
            switch (alarm.status) {
                case AlarmStatus.OPEN:
                    alarmList.push(alarm);
                    break;
                case AlarmStatus.IN_PROGRESS:
                    alarmList.push(alarm);
                    break;
                case AlarmStatus.ACKNOWLEDGED:
                    alarmList.push(alarm);
                    break;
                default:
                    break;
            }
        }
        this.alarms = alarmList;
    }


    connectedCallback() {
        super.connectedCallback();
        this.loadAlarms(true);
    }

    private loading = false;

    private async loadAlarms(force: boolean) {
        if (this.loading && !force) return;
        this.loading = true;

        try {
            const mgr = manager;
            const realm = mgr.displayRealm;

            const response = await mgr.rest.api.AlarmResource.getAlarms({ realm });
            const tempAlarms = response.data as AlarmModel[];

            this.alarms = tempAlarms.filter(a =>
                a.status === AlarmStatus.OPEN ||
                a.status === AlarmStatus.IN_PROGRESS ||
                a.status === AlarmStatus.ACKNOWLEDGED
            );
        } finally {
            this.loading = false;
            console.log(this.alarms)
        }
    }



    protected render(): TemplateResult {
        console.log("rendering");

        const columns: TableColumn[] = [
            { title: i18next.t("createdOn"), isSortable: true },
            { title: i18next.t("severity"), isSortable: true },
            { title: i18next.t("status"), isSortable: true},
            { title: i18next.t("title"), isSortable: true },
            { title: i18next.t("content"), isSortable: false }
        ];
        const rows: TableRow[] = this.alarms.map(a => ({

                content: [
                    a.createdOn ? new Date(a.createdOn) : "",
                    a.severity ?? "",
                    a.status ?? "",
                    a.title ?? "",
                    a.content ?? ""
                ]
            }
        ));

        const tableConfig: any = {
            fullHeight: true,
            pagination: {
                enable: true,
                options: this.widgetConfig.tableOptions,
            }
        } as TableConfig

        return html`            
            <div id="widget-wrapper">
                <or-mwc-table .columns="${columns}" .rows="${rows}" .config="${tableConfig}" .paginationSize="${0}"}"
                ></or-mwc-table>
        </div>
        `;
    }
}

// ---------------- SETTINGS ----------------
@customElement("alarm-widget-settings")
export class AlarmWidgetSettings extends WidgetSettings {
    protected readonly widgetConfig!: AlarmWidgetConfig;

    protected render(): TemplateResult {
        return html`
            <span>${i18next.t("noSettingsAvailable")}</span>
        `;
    }
}
