import { html, TemplateResult, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import {OrAssetWidget} from "../util/or-asset-widget";
import {WidgetManifest} from "../util/or-widget";
import {WidgetConfig} from "../util/widget-config";
import {WidgetSettings} from "../util/widget-settings";
import "@openremote/or-mwc-components/or-mwc-table";
import {TableColumn, TableRow} from "@openremote/or-mwc-components/or-mwc-table";
import { i18next } from "@openremote/or-translate";
import manager from "@openremote/core";
import type { SentAlarm } from "@openremote/model";
import {
    AlarmAssetLink
} from "@openremote/model";

// ---------------- CONFIG ----------------
export interface AlarmWidgetConfig extends WidgetConfig {

    }
interface AlarmModel extends SentAlarm {
    loaded?: boolean;
    loading?: boolean;
    alarmAssetLinks?: AlarmAssetLink[];
    previousAssetLinks?: AlarmAssetLink[];
}

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

  protected willUpdate(changedProps: PropertyValues) {
    this.refreshContent(false)
  }

  private alarms: AlarmModel[] = [];

  public async refreshContent(force: boolean) {
    const mgr = manager;
    const realm = mgr.getRealm();
    const response = await mgr.rest.api.AlarmResource.getAlarms({realm}, undefined, );
    this.alarms = response.data as AlarmModel[];
    this.requestUpdate();
  }

  protected render(): TemplateResult {
    const columns: TableColumn[] = [
      { title: i18next.t("createdOn"), isSortable: true },
      { title: i18next.t("severity"), isSortable: true },
      { title: i18next.t("title"), isSortable: true },
      { title: i18next.t("content"), isSortable: false }
    ];
    const rows: TableRow[] = this.alarms.map(a => ({
      content: [
        a.createdOn ? new Date(a.createdOn) : "",
        a.severity ?? "",
        a.title ?? "",
        a.content ?? ""
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
