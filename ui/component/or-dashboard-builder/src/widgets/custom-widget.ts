import {html, css, TemplateResult} from "lit";
import {customElement, state} from "lit/decorators.js";
import {OrAssetWidget} from "../util/or-asset-widget";
import {AssetWidgetConfig} from "../util/widget-config";
import {Attribute, AttributeRef} from "@openremote/model";
import {OrWidget, WidgetManifest} from "../util/or-widget";
import {WidgetSettings} from "../util/widget-settings";
import {GaugeSettings} from "../settings/gauge-settings";
import {when} from "lit/directives/when.js";
import {
    AlarmAssetLink,
    AlarmSeverity,
    AlarmSource,
    AlarmStatus,
    Asset,
    SentAlarm,
    User,
    UserQuery
} from "@openremote/model";
import manager, {DefaultColor3, DefaultColor4} from "@openremote/core";

export interface CustomWidgetConfig extends AssetWidgetConfig {
    attributeRefs: AttributeRef[];
    customFieldOne: string;
    customFieldTwo: number;
}

interface AlarmModel extends SentAlarm {
    loaded?: boolean;
    loading?: boolean;
    alarmAssetLinks?: AlarmAssetLink[];
    previousAssetLinks?: AlarmAssetLink[];
}

function getDefaultWidgetConfig(): CustomWidgetConfig {
    return {
        attributeRefs: [],
        customFieldOne: "default text",
        customFieldTwo: 0
    };
}

@customElement("custom-widget")
export class CustomWidget extends OrWidget {

    // Override of widgetConfig with extended type
    protected readonly widgetConfig!: CustomWidgetConfig;

    @state()
    protected _alarms: AlarmModel[] = [];
    @state()
    public alarm?: AlarmModel;
    static getManifest(): WidgetManifest {
        return {
            displayName: "Alarm Widget", // name to display in widget browser
            displayIcon: "alarm", // icon to display in widget browser. Uses <or-icon> and https://materialdesignicons.com
            minColumnWidth: 1,
            minColumnHeight: 1,
            getContentHtml(config: CustomWidgetConfig): OrWidget {
                return new CustomWidget(config);
            },
            getSettingsHtml(config: CustomWidgetConfig): WidgetSettings {
                return new CustomSettings(config);
            },
            getDefaultConfig(): CustomWidgetConfig {
                return getDefaultWidgetConfig();
            }
        }
    }

    public refreshContent(force: boolean) {
        // function that executes on refresh of the widget.
        // It's normally a 'silent' function that, for example, fetches the data of assets again.
    }

    protected render(): TemplateResult {
        const response = manager.rest.api.AlarmResource.getAlarms({realm: manager.displayRealm});

        return html`
                    <h1>In development 2</h1>

                    `;
    }
/*
    protected getAlarmsTable(writeAlarms: boolean) {
        return html`
            <or-alarms-table .alarms=${this._data} .readonly=${!writeAlarms}
            ></or-alarms-table>
        `;
    }*/

}




// Settings element
// This can be placed in a seperate file if preferred.
@customElement("custom-settings")
export class CustomSettings extends WidgetSettings {

    // Override of widgetConfig with extended type
    protected readonly widgetConfig!: CustomWidgetConfig;

    protected render(): TemplateResult {
        return html`
            <span>Custom settings</span>
            <button @click="${() => this.onButtonClick()}">Click to customize text</button>
        `;
    }

    protected onButtonClick() {
        this.widgetConfig.customFieldOne = "BRAAAA";
        this.notifyConfigUpdate();
    }
}
