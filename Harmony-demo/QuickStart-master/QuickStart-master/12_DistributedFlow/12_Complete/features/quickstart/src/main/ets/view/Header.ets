/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { emitter } from '@kit.BasicServicesKit';
import { Speaker } from 'utils';

@Component
export struct Header {
  @State message: string = '快速入门';
  @State isPlaying: boolean = false;
  speaker: Speaker = new Speaker();
  content: string = '余承东邀请你开启鸿蒙体验之旅 欢迎来到HarmonyOS世界';

  aboutToAppear(): void {
    emitter.on('eventId', () => {
      this.isPlaying = false;
    });
  }

  build() {
    Row() {
      Text(this.message)
        .fontFamily('HarmonyHeiTi-Bold')
        .fontSize(24)
        .textAlign(TextAlign.Start)
        .lineHeight(33)
        .fontWeight(700)

      Image(this.isPlaying ? $r('app.media.ic_AI_read_on') : $r('app.media.ic_AI_read_normal'))
        .width(40)
        .height(40)
        .onClick(() => {
          this.isPlaying = !this.isPlaying;
          if (this.isPlaying === true) {
            this.speaker.startSpeak(this.content)
          } else {
            this.speaker.stopSpeak()
          }
        })
    }
    .padding({
      left: 16,
      right: 16
    })
    .justifyContent(FlexAlign.SpaceBetween)
    .height(56)
    .margin({
      bottom: 11
    })
    .width('100%')
  }
}