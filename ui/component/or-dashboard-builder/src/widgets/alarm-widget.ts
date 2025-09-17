import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import {OrAssetWidget} from "../util/or-asset-widget";
import {WidgetManifest} from "../util/or-widget";
import {WidgetConfig} from "../util/widget-config";
import {WidgetSettings} from "../util/widget-settings";
import {TableSettings} from "../settings/table-settings";
import "@openremote/or-mwc-components/or-mwc-table";
import {OrMwcTableRowClickEvent, TableColumn, TableRow, TableConfig} from "@openremote/or-mwc-components/or-mwc-table";
import { i18next } from "@openremote/or-translate";
import {Util} from "@openremote/core";
import {Asset, AssetModelUtil} from "@openremote/model";
import { Manager } from "@openremote/core";
import type { SentAlarm } from "@openremote/model";

// ---------------- CONFIG ----------------
export interface AlarmWidgetConfig extends WidgetConfig {}

function getDefaultWidgetConfig(): AlarmWidgetConfig {
  return {};
}

// ---------------- WIDGET ----------------
@customElement("alarm-widget")
export class AlarmWidget extends OrAssetWidget {

  protected readonly widgetConfig!: AlarmWidgetConfig;

  static getManifest(): WidgetManifest {
    return {
      displayName: "Alarm Widget",
      displayIcon: "alarm-light",
      minColumnWidth: 2,
      minColumnHeight: 2,
      getContentHtml(config: AlarmWidgetConfig): OrWidget {
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

  private alarms: SentAlarm[] = [];

  public async refreshContent(force: boolean) {
    const mgr = getManager();
    this.alarms = await mgr.rest.api.AlarmResource.getSentAlarms();
    this.requestUpdate();
  }

  protected render(): TemplateResult {
    const columns: TableColumn[] = [
      { title: i18next.t("id"), isSortable: true },
      { title: i18next.t("createdOn"), isSortable: true },
      { title: i18next.t("severity"), isSortable: true },
      { title: i18next.t("message"), isSortable: false },
    ];

    const rows: TableRow[] = this.alarms.map(a => ({
      content: [
        a.id ?? "",
        a.createdOn ? new Date(a.createdOn) : "",
        a.severity ?? "",
        a.message ?? ""
      ]
    }));

    return html`
      <or-mwc-table
        .columns=${columns}
        .rows=${rows}
        .config=${{ stickyFirstColumn: true, pagination: { enable: true, options: [10, 25, 100] } }}
      >
      </or-mwc-table>
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
