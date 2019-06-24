/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  OnInit,
  Optional,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';

import { tap } from 'rxjs/operators';
import { HeaderPickerComponent, SupportHeaderPanel } from './header-picker.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-month-picker',
  exportAs: 'nzMonthPicker',
  templateUrl: './header-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NzMonthPickerComponent)
    }
  ]
})
export class NzMonthPickerComponent extends HeaderPickerComponent implements OnInit {
  @Input() nzFormat: string;

  endPanelMode: SupportHeaderPanel = 'month';

  constructor(
    i18n: NzI18nService,
    cdr: ChangeDetectorRef,
    dateHelper: DateHelperService,
    renderer: Renderer2,
    elementRef: ElementRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(i18n, cdr, dateHelper, noAnimation);
    renderer.addClass(elementRef.nativeElement, 'ant-calendar-picker');
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Default or locale's format when it's empty
    if (!this.nzFormat) {
      this.i18n.localeChange
        .pipe(
          tap(() => {
            if (this.dateHelper.relyOnDatePipe) {
              this.nzFormat = 'YYYY-MM';
            } else {
              this.nzFormat = this.i18n.getLocaleData('DatePicker.lang.monthFormat', 'yyyy-MM');
            }
          })
        )
        .subscribe();
    }
  }
}
