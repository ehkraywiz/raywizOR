import {customElement, state} from "lit/decorators.js";
import {OrAssetWidget} from "../util/or-asset-widget";
import {OrWidget, WidgetManifest} from "../util/or-widget";
import {WidgetSettings} from "../util/widget-settings";
import {AssetWidgetConfig} from "../util/widget-config";
import {AlarmAssetLink, AlarmSeverity, AlarmStatus, SentAlarm} from "@openremote/model";
import {css, html, TemplateResult} from "lit";
import "@openremote/or-attribute-card";
// @ts-ignore
import {i18next} from "@openremote/or-translate";
import {AlarmWidgetConfig} from "@dashboard/widgets/alarm-widget";
import manager from "@openremote/core";

export interface StatuslightWidgetConfig extends AssetWidgetConfig {
    period?: 'year' | 'month' | 'week' | 'day' | 'hour';
    decimals: number;
    deltaFormat: "absolute" | "percentage";
    showTimestampControls: boolean;
}

function getDefaultWidgetConfig(): StatuslightWidgetConfig {
    return {
        attributeRefs: [],
        period: "day",
        decimals: 0,
        deltaFormat: "absolute",
        showTimestampControls: false
    };
}
interface AlarmModel extends SentAlarm {
    loaded?: boolean;
    loading?: boolean;
    alarmAssetLinks?: AlarmAssetLink[];
    previousAssetLinks?: AlarmAssetLink[];
}


const styling = css`
    #widget-container {
        flex: 1;
        justify-content: center;
    }
    .lightwrapper {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        gap: 0.75rem;
        height: 100%;
        width: 100%;
        place-items: center;
    }
    
    .light {
        height: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background-clip: padding-box;
        display: grid;
        place-items: center;
    }
    #critical {
        background-color: red;
        border: black solid 6px;
    }
    #warning {
        background-color: darkorange;
        border: black solid 6px;
    }
    #okidoki {
        background-color: #0f0;
        border: black solid 6px;
    }
    .inactive {
        filter: grayscale(0.9);
        border: transparent !important;
    }
`

enum Statuslight {
    OK,
    ERROR,
    CRITICAL
}


@customElement("statuslight-widget")
export class StatuslightWidget extends OrAssetWidget {


    static get styles() {
        return [...super.styles, styling];
    }


    protected widgetConfig!: StatuslightWidgetConfig;

    @state()
    protected _loading = false;

    static getManifest(): WidgetManifest {
        return {
            displayName: "Statuslight",
            displayIcon: "traffic-light",
            minColumnWidth: 1,
            minColumnHeight: 2,
            getContentHtml(config: StatuslightWidgetConfig): OrWidget {
                return new StatuslightWidget(config);
            },
            getSettingsHtml(config: StatuslightWidgetConfig): WidgetSettings {
                return new StatuslightWidgetSettings(config);
            },
            getDefaultConfig(): StatuslightWidgetConfig {
                return getDefaultWidgetConfig();
            }
        }
    }




    @state()
    private alarms: AlarmModel[] = [];

    @state()
    private lightStatus = Statuslight.OK;

    public async refreshContent(force: boolean) {
        const mgr = manager;
        const realm = mgr.displayRealm;
        const response = await mgr.rest.api.AlarmResource.getAlarms({realm}, undefined, );
        const tempAlarms = response.data as AlarmModel[];
        this.lightStatus = this.solveStatus(tempAlarms);
    }

    private solveStatus(alarmList: AlarmModel[]) {

        const openAlarms = alarmList.filter(alarm => alarm.status == AlarmStatus.OPEN && alarm.severity != AlarmSeverity.LOW);
        const inProgressAlarms = alarmList.filter(alarm => alarm.status == AlarmStatus.IN_PROGRESS);

        if(openAlarms.filter(a => a.severity == AlarmSeverity.HIGH).length > 0) return Statuslight.CRITICAL;
        if(openAlarms.filter(a => a.severity == AlarmSeverity.MEDIUM).length > 0) return Statuslight.ERROR;
        if(inProgressAlarms.filter(a => a.severity == AlarmSeverity.HIGH).length > 0) return Statuslight.ERROR;
        return Statuslight.OK;
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
            this.lightStatus = this.solveStatus(tempAlarms);

        } finally {
            this.loading = false;
        }

    }

    protected render(): TemplateResult {
        return html`
            <div class="lightwrapper">
                <div class="light ${this.lightStatus !== Statuslight.CRITICAL ? 'inactive' : ''}" id="critical">Active <br> Alarm</div>
                <div class="light ${this.lightStatus !== Statuslight.ERROR ? 'inactive' : ''}" id="warning">Warning</div>
                <div class="light ${this.lightStatus !== Statuslight.OK ? 'inactive' : ''}" id="okidoki">OK</div>
            </div>
        `;
    }

}
@customElement("statuslight-widget-settings")
export class StatuslightWidgetSettings extends WidgetSettings {
    protected readonly widgetConfig!: AlarmWidgetConfig;

    protected render(): TemplateResult {
        return html`
      <span>${i18next.t("noSettingsAvailable")}</span>
    `;
    }
}
