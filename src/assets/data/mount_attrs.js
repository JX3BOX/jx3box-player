const xfAttr = {
    "10028": ["heal", "atSpiritBase", "crit", "critEffect", "haste", "health", "toughness", "huajing"], // 离经
    "10080": ["heal", "atSpiritBase", "crit", "critEffect", "haste", "health", "toughness", "huajing"], // 云裳
    "10176": ["heal", "atSpiritBase", "crit", "critEffect", "haste", "health", "toughness", "huajing"], // 补天
    "10448": ["heal", "atSpiritBase", "crit", "critEffect", "haste", "health", "toughness", "huajing"], // 相知

    "10002": ["atVitalityBase", "haste", "surplus", "physicsShield", "magicShield", "health", "dodge", "toughness", "parryBase", "parryValue"], // 洗髓
    "10062": ["atVitalityBase", "haste", "surplus", "physicsShield", "magicShield", "health", "dodge", "toughness", "parryBase", "parryValue"], // 铁牢
    "10243": ["atVitalityBase", "haste", "surplus", "physicsShield", "magicShield", "health", "dodge", "toughness", "parryBase", "parryValue"], // 明尊
    "10389": ["atVitalityBase", "haste", "surplus", "physicsShield", "magicShield", "health", "dodge", "toughness", "parryBase", "parryValue"], // 铁骨

    "10003": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 易筋经
    "10014": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 紫霞功
    "10015": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 太虚剑意
    "10021": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 花间游
    "10026": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 傲血战意
    "10081": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 冰心诀
    "10144": ["baseAttack", "attack", "weaponDamage", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 问水诀
    "10145": ["baseAttack", "attack", "weaponDamage", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 山居剑意
    "10175": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 毒经
    "10224": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 惊羽诀
    "10225": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 田螺诡道
    "10242": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 焚影圣诀
    "10268": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 笑尘诀
    "10390": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 分山劲
    "10447": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 莫问
    "10464": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 北傲诀
    "10533": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 凌海诀
    "10585": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 隐龙诀
    "10615": ["baseAttack", "attack", "surplus", "haste", "crit", "critEffect", "overcome", "strain", "health"], // 太玄经
};
const attrMaps = {
    baseAttack: "基础攻击",
    attack: "面板攻击",
    heal: "面板治疗量",
    weaponDamage: "武器伤害",
    surplus: "破招",
    haste: "加速",
    crit: "会心",
    critEffect: "会效",
    overcome: "破防",
    strain: "无双",
    health: "气血",
    physicsShield: "外防",
    magicShield: "内防",
    dodge: "闪避",
    toughness: "御劲",
    huajing: "化劲",
    parryBase: "招架",
    parryValue: "拆招",
    atVitalityBase: "体质",
    atSpunkBase: "元气",
    atSpiritBase: "根骨",
    atStrengthBase: "力道",
    atAgilityBase: "身法",
};

export { xfAttr, attrMaps };
