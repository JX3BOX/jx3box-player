import {
    equipment_quality_coefficients,
    equipment_position_coefficients,
} from "@/assets/data/gs.json";
export default function(quality,color,position) {
    // 装备分数 = 品质 * 品质系数 * 部位系数
    return ~~(
        Number(quality) *
        Number(equipment_quality_coefficients[color]) *
        Number(equipment_position_coefficients[position])
    );
}
