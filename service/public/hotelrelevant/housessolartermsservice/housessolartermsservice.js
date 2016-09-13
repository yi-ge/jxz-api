import {HousesSolarTerms} from './../../../../core';
class HousesSolarTermsService {
    /**
     * 添加节气
     * @param house_id
     * @param season
     * @param name
     * @param solar_terms_begin_date
     * @param solar_terms_end_date
     * @param is_set_price
     * @param creater
     * @returns {*}
     */

    addHousesSolarTerms(house_id, season, name, solar_terms_begin_date, solar_terms_end_date, is_set_price, creater) {
        return HousesSolarTerms.transaction(t=> {
            return HousesSolarTerms.insert(HousesSolarTerms.createModel(house_id, season, name, solar_terms_begin_date, solar_terms_end_date, creater, creater, null, is_set_price), {
                transaction: t
            });
        });
    }

    /**
     * 批量添加节气
     * @param house_id
     * @param termslist [season,name,solar_terms_begin_date,solar_terms_end_date,is_set_price]
     * @param creater
     * @returns {*}
     */
    addListHousesSolarTerms(house_id, termslist, creater) {
        let list = [], term, status = false, model, stratDate, endDate;
        try {
            for (let j = 0, l = termslist.length; j < l; j++) {
                term = termslist[j];
                model = HousesSolarTerms.createModel(house_id, term.season, term.name, term.start_date, term.end_date, creater, creater, null, term.is_set_price);
                stratDate = model.solar_terms_begin_date;
                endDate = model.solar_terms_end_date;
                for (let i = 0, len = list.length; i < len; i++) {
                    term = list[i];
                    if (!(term.solar_terms_begin_date > endDate || term.solar_terms_end_date < stratDate)) {
                        status = true;
                        break;
                    }
                }
                if (!status) list.push(model);
                else return HousesSolarTerms.errorPromise("节气时间重复");
            }
        }catch (e){
            return HousesSolarTerms.errorPromise("节气添加失败");
        }
        return HousesSolarTerms.transaction(t=> {
            return HousesSolarTerms.destroy({
                where: {houses_id: house_id}
            }).then((result)=> {
                return HousesSolarTerms.bulkCreate(list, {
                    transaction: t,
                });
            });
        });
    }

    /**
     * 编辑节气
     * @param id
     * @param solar_terms_begin_date
     * @param solar_terms_end_date
     * @param modifier
     * @returns {*}
     */
    editHousesSolarTerms(id, solar_terms_begin_date, solar_terms_end_date, is_set_price, modifier) {
        let updateObj = {};
        solar_terms_begin_date != void(0) && (updateObj.solar_terms_begin_date = solar_terms_begin_date);
        solar_terms_end_date != void(0) && (updateObj.solar_terms_end_date = solar_terms_end_date);
        is_set_price != void(0) && (Object.assign(updateObj, HousesSolarTerms.getIsSetPriceWhere(is_set_price)));
        if (!id || Object.keys(updateObj).length == 0)return HousesSolarTerms.errorPromise("参数不正确");
        return HousesSolarTerms.transaction(t=> {
            return HousesSolarTerms.update({
                solar_terms_begin_date: solar_terms_begin_date,
                solar_terms_end_date: solar_terms_end_date,
                modifier: modifier,
                updated_at: new Date(),
            }, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(result=> {
            return HousesSolarTerms.findById(id);
        }).then(term=> {
            return HousesSolarTerms.formatHousesSolarTerms(term);
        });
    }

    /**
     * 删除当前节气
     * @param id
     * @returns {*}
     */
    destroyHousesSolarTerms(id) {
        return HousesSolarTerms.transaction(t=> {
            return HousesSolarTerms.destroy({where: {id: id}});
        });
    }

    /**
     * 查询对应酒店节气
     * @param house_id
     * @returns {*}
     */
    findHousesSolarTermsList(house_id) {
        return HousesSolarTerms.findList({
            where: {houses_id: house_id},
            order:`season ASC`
        }).then(list=> {
            list.list.map(term=> {
                HousesSolarTerms.formatHousesSolarTerms(term.dataValues);
            });
            return list;
        });
    }
}
export default new HousesSolarTermsService();