/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

/**
 * Common constants for all features.
 */
export default class CommonConstants {
  /**
   * The width or height of the component is spread across the parent component.
   */
  static readonly FULL_PARENT: string = '100%';

  /**
   * The sql of creating sports table.
   */
  static readonly CREATE_SPORTS_TABLE_SQL: string =
    'CREATE TABLE IF NOT EXISTS SPORTS (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT ' +
      'NOT NULL, TYPE TEXT NOT NULL)';

  /**
   * The sql of creating plans table.
   */
  static readonly CREATE_PLANS_TABLE_SQL: string =
  'CREATE TABLE IF NOT EXISTS PLANS (ID INTEGER PRIMARY KEY AUTOINCREMENT, SPORT_ID INTEGER ' +
  'NOT NULL, DURATION INTEGER NOT NULL, STATUS TEXT NOT NULL)';

  /**
   * The sql of querying all durations.
   */
  static readonly QUERY_ALL_DURATIONS_SQL: string =
  'SELECT DISTINCT DURATION FROM PLANS';

  /**
   * The sql of query all plans.
   */
  static readonly QUERY_ALL_PLANS_SQL: string =
  'SELECT p.id as ID,s.NAME as NAME,s.type as TYPE,p.DURATION as DURATION,p.STATUS as STATUS FROM SPORTS as s ' +
    'join PLANS as p where s.ID = P.SPORT_ID';

  /**
   * The sql of querying plans by duration.
   */
  static readonly QUERY_PLANS_BY_DURATION_SQL: string =
    'SELECT p.id as ID,s.NAME as NAME,s.type as TYPE,p.DURATION as DURATION,p.STATUS as STATUS FROM SPORTS as s' +
      ' join PLANS as p where s.ID = P.SPORT_ID and p.DURATION = ';

  /**
   * The sql of querying plans by status.
   */
  static readonly QUERY_PLANS_BY_STATUS_SQL: string =
    'SELECT p.id as ID,s.NAME as NAME,s.type as TYPE,p.DURATION as DURATION,p.STATUS as STATUS FROM SPORTS as s' +
      ' join PLANS as p where s.ID = P.SPORT_ID and p.STATUS = "';
}