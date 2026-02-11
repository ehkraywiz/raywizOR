import {css, html, TemplateResult} from "lit";
import {customElement, state} from "lit/decorators.js";
import {OrAssetWidget} from "../util/or-asset-widget";
import {WidgetManifest} from "../util/or-widget";
import {WidgetConfig} from "../util/widget-config";
import {WidgetSettings} from "../util/widget-settings";
import "@openremote/or-mwc-components/or-mwc-table";
// @ts-ignore
import {OrMwcTableRowClickEvent, TableColumn, TableConfig, TableRow} from "@openremote/or-mwc-components/or-mwc-table";
import {i18next} from "@openremote/or-translate";
import manager from "@openremote/core";
import {AlarmAssetLink, AlarmSeverity, AlarmStatus, SentAlarm} from "@openremote/model";

// ---------------- CONFIG ----------------
export interface AlarmWidgetConfig extends WidgetConfig {
    tableOptions: number[];
    tableSize: number;
}

interface AlarmModel extends SentAlarm {
    loaded?: boolean;
    loading?: boolean;
    alarmAssetLinks?: AlarmAssetLink[];
    previousAssetLinks?: AlarmAssetLink[];
}

function getDefaultWidgetConfig(): AlarmWidgetConfig {
    return {tableOptions: [], tableSize: 10};
}

const styling = css`
    #widget-container {
        height: 100%;
        overflow: scroll;
    }

    #widget-wrapper {
        height: 100%;
        overflow: hidden;
    }

    .severity {
        font-weight: 600;
    }

    .sev-high {
        color: #d32f2f !important; /* red */
    }

    .sev-medium {
        color: #f57c00 !important; /* orange */
    }

    .sev-low {
        color: #388e3c !important; /* green */
    }

    .sev-unknown {
        color: #666;
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
        const response = await mgr.rest.api.AlarmResource.getAlarms({realm}, undefined,);
        const tempAlarms = response.data as AlarmModel[];
        const alarmList: AlarmModel[] = []
        for (const alarm of tempAlarms) {
            switch (alarm.status) {
                case AlarmStatus.OPEN:
                    alarmList.push(alarm);
                    break;
                case AlarmStatus.IN_PROGRESS:
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

            const response = await mgr.rest.api.AlarmResource.getAlarms({realm});
            const tempAlarms = response.data as AlarmModel[];

            this.alarms = tempAlarms.filter(a =>
                a.status === AlarmStatus.OPEN ||
                a.status === AlarmStatus.IN_PROGRESS
            );
        } finally {
            this.loading = false;
            console.log(this.alarms)
        }
    }

    private severityRowClass(sev?: AlarmSeverity): string {
        switch (sev) {
            case AlarmSeverity.HIGH:
                return "row-high";
            case AlarmSeverity.MEDIUM:
                return "row-medium";
            case AlarmSeverity.LOW:
                return "row-low";
            default:
                return "";
        }
    }


    protected render(): TemplateResult {

        const columns: TableColumn[] = [
            {title: i18next.t("createdOn"), isSortable: true},
            {title: i18next.t("alarm.severity"), isSortable: true},
            {title: i18next.t("alarm.status"), isSortable: true},
            {title: i18next.t("linkedAssets"), isSortable: true},
            {title: i18next.t("alarm.title"), isSortable: true},
        ];


        const rows: TableRow[] = this.alarms.map(a => ({
            rowClass: this.severityRowClass(a.severity),
            content: [
                a.createdOn ? new Date(a.createdOn) : "",
                a.severity ?? "",
                a.status ?? "",
                a.asset?.[0]?.name ?? "",
                a.title ?? ""
            ]
        }));

        const tableConfig: any = {
            fullHeight: true,
            pagination: {
                enable: true,
                options: this.widgetConfig.tableOptions,
            }
        } as TableConfig

        return html`
            <div id="widget-wrapper">
                <or-mwc-table .columns="${columns}" .rows="${rows}" .config="${tableConfig}"
                              .paginationSize="${this.widgetConfig.tableSize}"
                              @or-mwc-table-row-click="${(ev: OrMwcTableRowClickEvent) => this.onTableRowClick(ev)}"
                ></or-mwc-table>
            </div>
        `;
    }

    protected onTableRowClick(ev: OrMwcTableRowClickEvent) {

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
