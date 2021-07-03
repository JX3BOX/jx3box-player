import { equipment_quality_coefficients, equipment_position_coefficients, stoneScore } from "@/assets/data/gs.json";

// 装备分数 = 品质 * 品质系数 * 部位系数
function getEquipOriginScore(quality, color, position, mount_id) {
    const isCJ = [10144, 10145].includes(mount_id);
    let isWeapon = position == "0" || position == "1";
    // 藏剑武器折半
    if (isCJ && isWeapon) {
        return ~~((Number(quality) * Number(equipment_quality_coefficients[color]) * Number(equipment_position_coefficients[position])) / 2);
    }
    return ~~(Number(quality) * Number(equipment_quality_coefficients[color]) * Number(equipment_position_coefficients[position]));
}

// 五彩石分数
function getColorStoneScore(stone_level) {
    return Math.round(~~stone_level * 308);
}

// 五行石插孔(石头级别*系数)
function getFiveStoneScore(stone_level) {
    return stoneScore[~~stone_level];
}

// 精炼分数|属性成长
function getGrowScore(base, strength) {
    return Math.round((~~base * ~~strength * (0.007 + ~~strength * 0.003)) / 2);
}

// 总分数 = 五行石插孔、五彩石、精炼分数 + 装备分数
function getGS(equip_data, mount_id) {
    let total_gs = 0;

    equip_data.forEach((item) => {
        if (item) {
            // 装备分数
            let equip_gs = getEquipOriginScore(item.Quality, item.Color, item.UcPos, mount_id);
            total_gs += equip_gs;

            // 精炼分数
            total_gs += getGrowScore(equip_gs, ~~item.StrengthLevel);

            // 五行石插孔
            if (item.FiveStone) {
                item.FiveStone.forEach((stone) => {
                    total_gs += getFiveStoneScore(~~stone.Level);
                });
            }

            // 五彩石
            if (item.ColorStone) {
                total_gs += getColorStoneScore(~~item.ColorStone.Level);
            }
        }
    });

    return Math.floor(total_gs);
}

export { getEquipOriginScore, getFiveStoneScore, getColorStoneScore, getGrowScore, getGS };
