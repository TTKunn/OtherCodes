import relationalStore from "@ohos:data.relationalStore";
import hilog from "@ohos:hilog";
import type { BusinessError as BusinessError } from "@ohos:base";
import { GoalItem } from "@bundle:com.example.pageanddata/entry/ets/viewmodel/GoalItem";
import CommonConstants from "@bundle:com.example.pageanddata/entry/ets/common/constants/CommonConstants";
const TAG: string = 'RDBStoreUtil';
// RDBStoreUtil提供了创建、保存和查询RDB存储的功能
export class RDBStoreUtil {
    objectiveRDB?: relationalStore.RdbStore;
    // 创建RDBStore实例的方法
    createObjectiveRDB(context: Context) {
        const STORE_CONFIG: relationalStore.StoreConfig = {
            name: 'Objective.db',
            securityLevel: relationalStore.SecurityLevel.S1
        };
        relationalStore.getRdbStore(context, STORE_CONFIG, (err: BusinessError, rdbStore: relationalStore.RdbStore) => {
            this.objectiveRDB = rdbStore;
            if (err) {
                hilog.error(0x0000, TAG, `Get RdbStore failed, code is ${err.code},message is ${err.message}`);
                return;
            }
            hilog.error(0x0000, TAG, 'Get RdbStore successfully.');
        });
    }
    // 创建运动表的方法
    createSportTable() {
        this.objectiveRDB?.execute(CommonConstants.CREATE_SPORTS_TABLE_SQL)
            .then(() => {
            hilog.info(0x0000, TAG, `execute create sport table sql success`);
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `execute sql failed, code is ${err.code},message is ${err.message}`);
        });
    }
    // 创建计划表的方法
    createPlanTable() {
        this.objectiveRDB?.execute(CommonConstants.CREATE_PLANS_TABLE_SQL)
            .then(() => {
            hilog.info(0x0000, TAG, `execute create plas table sql success`);
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `execute sql failed, code is ${err.code},message is ${err.message}`);
        });
    }
    // 初始化运动表的方法
    initSportTable() {
        const sportDataOne: relationalStore.ValuesBucket = {
            'ID': 0,
            'NAME': '晨跑',
            'TYPE': '有氧运动'
        };
        const sportDataTWO: relationalStore.ValuesBucket = {
            'ID': 1,
            'NAME': '瑜伽',
            'TYPE': '柔韧运动'
        };
        const sportDataThree: relationalStore.ValuesBucket = {
            'ID': 2,
            'NAME': '游泳',
            'TYPE': '有氧运动'
        };
        let valueBuckets = new Array(sportDataOne, sportDataTWO, sportDataThree);
        this.objectiveRDB?.batchInsert('SPORTS', valueBuckets).then((insertNum: number) => {
            hilog.info(0x0000, TAG, `batchInsert is successful, the number of values that were inserted = ${insertNum}`);
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `batchInsert is failed, code is ${err.code},message is ${err.message}`);
        });
    }
    // 查询所有计划中的所有持续时间的方法
    async queryAllPlansDuration(): Promise<number[]> {
        let plansSet: Array<number> = [];
        await this.objectiveRDB?.querySql(CommonConstants.QUERY_ALL_DURATIONS_SQL).then((resultSet: relationalStore.ResultSet) => {
            while (resultSet.goToNextRow()) {
                let duration: number = resultSet.getValue(resultSet.getColumnIndex('DURATION')) as number;
                plansSet.push(duration);
            }
            resultSet.close();
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `Query failed, code is ${err.code},message is ${err.message}`);
        });
        return plansSet;
    }
    // 查询所有计划的方法
    async queryAllPlans(): Promise<GoalItem[]> {
        let plansSet: Array<GoalItem> = [];
        await this.objectiveRDB?.querySql(CommonConstants.QUERY_ALL_PLANS_SQL)
            .then((resultSet: relationalStore.ResultSet) => {
            while (resultSet.goToNextRow()) {
                const id = resultSet.getValue(resultSet.getColumnIndex('ID')) as number;
                const name = resultSet.getValue(resultSet.getColumnIndex('NAME')) as string;
                const type = resultSet.getValue(resultSet.getColumnIndex('TYPE')) as string;
                const duration = resultSet.getValue(resultSet.getColumnIndex('DURATION')) as number;
                const status = resultSet.getValue(resultSet.getColumnIndex('STATUS')) as string;
                plansSet.push(new GoalItem(id, name, type, duration, status));
            }
            resultSet.close();
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `Query failed, code is ${err.code},message is ${err.message}`);
        });
        return plansSet;
    }
    // 插入计划信息的方法
    async insertPlan(sportID: number, duration: number, status: boolean) {
        const sportData: relationalStore.ValuesBucket = {
            'SPORT_ID': sportID,
            'DURATION': duration,
            'STATUS': status ? '已完成' : '未完成'
        };
        await this.objectiveRDB?.insert('PLANS', sportData, relationalStore.ConflictResolution.ON_CONFLICT_REPLACE).then((rowId: number) => {
            hilog.info(0x0000, TAG, `Insert is successful, rowId = ${rowId}`);
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `Insert is failed, code is ${err.code},message is ${err.message}`);
        });
    }
    // 更新计划信息的方法
    async updatePlan(planID: number, duration: number, status: boolean) {
        const planData: relationalStore.ValuesBucket = {
            'DURATION': duration,
            'STATUS': status ? '已完成' : '未完成'
        };
        let predicates = new relationalStore.RdbPredicates('PLANS');
        predicates.equalTo('ID', planID);
        await this.objectiveRDB?.update(planData, predicates, relationalStore.ConflictResolution.ON_CONFLICT_REPLACE).then(async (rows: Number) => {
            hilog.info(0x0000, TAG, `Updated row count: ${rows}`);
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `Updated failed, code is ${err.code},message is ${err.message}`);
        });
    }
    // 删除计划信息的方法
    async deletePlan(planID: number) {
        let predicates = new relationalStore.RdbPredicates('PLANS');
        predicates.equalTo('ID', planID);
        await this.objectiveRDB?.delete(predicates).then((rows: Number) => {
            hilog.info(0x0000, TAG, `Delete rows: ${rows}`);
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `Delete failed, code is ${err.code},message is ${err.message}`);
        });
    }
    // 根据不同条件筛选所有计划的方法
    async conditionalPlansQuery(duration: number | undefined, status: boolean | undefined): Promise<GoalItem[]> {
        let plansSet: Array<GoalItem> = [];
        let querySql: string = '';
        if (status === undefined) {
            if (duration === undefined) {
                querySql = CommonConstants.QUERY_ALL_PLANS_SQL;
            }
            else {
                querySql = CommonConstants.QUERY_PLANS_BY_DURATION_SQL + duration;
            }
        }
        else {
            let statusCondition: string = status ? '已完成' : '未完成';
            if (duration === undefined) {
                querySql = CommonConstants.QUERY_PLANS_BY_STATUS_SQL + statusCondition + '"';
            }
            else {
                querySql = CommonConstants.QUERY_PLANS_BY_STATUS_SQL + statusCondition + '" and p.DURATION = ' + duration;
            }
        }
        await this.objectiveRDB?.querySql(querySql).then((resultSet: relationalStore.ResultSet) => {
            while (resultSet.goToNextRow()) {
                const id = resultSet.getValue(resultSet.getColumnIndex('ID')) as number;
                const name = resultSet.getValue(resultSet.getColumnIndex('NAME')) as string;
                const type = resultSet.getValue(resultSet.getColumnIndex('TYPE')) as string;
                const duration = resultSet.getValue(resultSet.getColumnIndex('DURATION')) as number;
                const status = resultSet.getValue(resultSet.getColumnIndex('STATUS')) as string;
                plansSet.push(new GoalItem(id, name, type, duration, status));
            }
            resultSet.close();
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `Query failed, code is ${err.code},message is ${err.message}`);
        });
        return plansSet;
    }
}
export default new RDBStoreUtil();
