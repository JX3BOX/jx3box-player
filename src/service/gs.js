import { equipment_quality_coefficients, equipment_position_coefficients, stoneScore } from "../assets/data/gs.json";

// 装备分数 = 品质 * 品质系数 * 部位系数
function getEquipOriginScore(quality, color, position, mount_id) {
    let score = Number(quality) * Number(equipment_quality_coefficients[color]) * Number(equipment_position_coefficients[position]);

    // 藏剑武器0.5
    const isCJ = [10144, 10145].includes(mount_id);
    let isWeapon0 = position == "0";
    let isWeapon1 = position == "1";
    if (isCJ && isWeapon0) {
        score = score * 0.5;
    } else if (isCJ && isWeapon1) {
        score = score * 0.5;
    }
    return Math.round(score);
}

// 五彩石分数
function getColorStoneScore(stone_level) {
    return ~~stone_level * 308;
}

// 五行石插孔(石头级别*系数)
function getFiveStoneScore(stone_level) {
    return stoneScore[~~stone_level];
}

// 精炼分数|属性成长
function getGrowScore(base, strength) {
    let score = (~~base * ~~strength * (0.007 + ~~strength * 0.003)) / 2;
    return Math.round(score);
}

// 总分数 = 五行石插孔、五彩石、精炼分数 + 装备分数
function getGS(equip_data, mount_id) {
    let total_gs = 1;

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

            // 五彩石（只算主武器）
            if (item.ColorStone && item.UcPos == '0') {
                total_gs += getColorStoneScore(~~item.ColorStone.Level);
            }
        }
    });

    return Math.round(total_gs);
}

export { getEquipOriginScore, getFiveStoneScore, getColorStoneScore, getGrowScore, getGS };
