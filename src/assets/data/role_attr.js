const BASE = {
    atVitalityBase: 38, // 体质
    atSpunkBase: 37, // 元气
    atSpiritBase: 38, // 根骨
    atStrengthBase: 37, // 力道
    atAgilityBase: 38, // 身法
}
// 五行石孔等级对应数值
const PRE_DEFINED_EMBED_VALUES = {
    defense: [6, 12, 18, 24, 30, 36, 48, 62],
    primaryAttribute: [2, 5, 8, 10, 13, 16, 21, 27],
    magicAttack: [6, 12, 19, 25, 32, 38, 51, 66],
    physicsAttack: [5, 10, 16, 21, 27, 32, 43, 55],
    secondaryAttribute: [12, 24, 36, 48, 60, 72, 96, 124],
    healthMana: [60, 120, 180, 241, 301, 361, 482, 623],
    recover: [4, 8, 12, 16, 21, 25, 33, 43],
};

const VALUE_MAP = {
    // PrimaryAttribute
    atVitalityBase: PRE_DEFINED_EMBED_VALUES.defense,
    atSpunkBase: PRE_DEFINED_EMBED_VALUES.primaryAttribute,
    atSpiritBase: PRE_DEFINED_EMBED_VALUES.primaryAttribute,
    atStrengthBase: PRE_DEFINED_EMBED_VALUES.primaryAttribute,
    atAgilityBase: PRE_DEFINED_EMBED_VALUES.primaryAttribute,

    // SecondaryAttribute
    physicsShield: PRE_DEFINED_EMBED_VALUES.defense,
    magicShield: PRE_DEFINED_EMBED_VALUES.defense,
    dodge: PRE_DEFINED_EMBED_VALUES.defense,
    parryBase: PRE_DEFINED_EMBED_VALUES.defense,
    parryValue: [34, 69, 104, 139, 174, 208, 278, 359],
    toughness: PRE_DEFINED_EMBED_VALUES.defense,
    heal: [5, 11, 17, 23, 29, 35, 46, 60],

    atPhysicsCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 外功会心
    atMagicCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 内功会心
    atNeutralCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 混元会心
    atPoisonCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 毒性会心
    atSolarAndLunarCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 阴阳性会心
    atLunarCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 阴性会心
    atSolarCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 阳性会心
    atAllTypeCriticalStrike: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 全会心

    atPhysicsOvercomeBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 外功破防
    atMagicOvercome: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 内功破防
    atNeutralOvercomeBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 混元破防
    atPoisonOvercomeBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 毒性破防
    atSolarAndLunarOvercomeBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 阴阳性破防
    atLunarOvercomeBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 阴性破防
    atSolarOvercomeBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 阳性破防

    atPhysicsCriticalDamagePowerBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 外功会效

    hit: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    atStrainBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 无双
    atSurplusValueBase: PRE_DEFINED_EMBED_VALUES.secondaryAttribute, // 破招
    haste: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    threat: [0.9, 1.8, 2.6, 3.5, 4.4, 5.3, 7.1, 9.2],
    huajing: PRE_DEFINED_EMBED_VALUES.defense,
    // ExtraAttribute
    atMaxLifeAdditional: PRE_DEFINED_EMBED_VALUES.healthMana,
    healthRecover: PRE_DEFINED_EMBED_VALUES.recover,
    mana: PRE_DEFINED_EMBED_VALUES.healthMana,
    manaRecover: PRE_DEFINED_EMBED_VALUES.recover,
}

const XF_FACTOR = {
    '10003': { // 易筋经
        attack: 1.85,
        crit: 0.38,
        base: {
            health_override: 1.34,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 265,
        magicShield: 312,
        primaryAttr: 'atSpunkBase',
        attackType: 'atSolarAttackPowerBase',
        critType: 'atSolarCriticalStrike',
        critEffectType: 'atSolarCriticalDamagePowerBase',
        overcomeType: 'atSolarOvercomeBase'
    },
    "10014": { // 紫霞功
        attack: 1.75,
        crit: 0.56,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 0,
        magicShield: 346,
        primaryAttr: 'atSpiritBase',
        attackType: 'atNeutralAttackPowerBase',
        critType: 'atNeutralCriticalStrike',
        critEffectType: 'atNeutralCriticalDamagePowerBase',
        overcomeType: 'atNeutralOvercomeBase'
    },
    '10015': { // 太虚剑意
        attack: 1.45,
        crit: 0.58,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 0,
        magicShield: 0,
        primaryAttr: 'atAgilityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10021': { // 花间游
        attack: 1.95,
        overcome: 0.19,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 0,
        magicShield: 231,
        primaryAttr: 'atSpunkBase',
        attackType: 'atNeutralAttackPowerBase',
        critType: 'atNeutralCriticalStrike',
        critEffectType: 'atNeutralCriticalDamagePowerBase',
        overcomeType: 'atNeutralOvercomeBase'
    },
    '10026': { // 傲血战意
        attack: 1.6, 
        overcome: 0.25,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725, // 化劲
        physicsShield: 408,
        magicShield: 0,
        primaryAttr: 'atStrengthBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10533': { // 凌海诀
        attack: 1.55, // 每点身法额外攻击力
        crit: 0.36, // 每点身法额外会心等级
        base: {
            health_override: 1.22, // 基础气血提高
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725, // 化劲
        primaryAttr: 'atAgilityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    "10081": { // 冰心诀
        attack: 1.9,
        crit: 0.28,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 254,
        physicsShield_addtional: 0,
        magicShield: 323,
        magicShield_addtional: 0,
        huajing: 1725,
        primaryAttr: 'atSpiritBase',
        attackType: 'atLunarAttackPowerBase',
        critType: 'atLunarCriticalStrike',
        critEffectType: 'atLunarCriticalDamagePowerBase',
        overcomeType: 'atLunarOvercomeBase'
    },
    '10144': { // 问水诀
        attack: 1.6, // 每点身法额外攻击力
        overcome: 0.25,
        base: {
            health_override: 1.22, // 基础气血提高
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725, // 化劲
        primaryAttr: 'atAgilityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10145': { // 山居剑意
        attack: 1.6, // 每点身法额外攻击力
        overcome: 0.25,
        base: {
            health_override: 1.22, // 基础气血提高
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725, // 化劲
        primaryAttr: 'atAgilityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10175': { // 毒经
        attack: 1.95,
        overcome: 0.19,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 0,
        magicShield: 578,
        primaryAttr: 'atSpiritBase',
        attackType: 'atPoisonAttackPowerBase',
        critType: 'atPoisonCriticalStrike',
        critEffectType: 'atPoisonCriticalDamagePowerBase',
        overcomeType: 'atPoisonOvercomeBase'
    },
    '10224': { // 惊羽诀
        attack: 1.45, 
        crit: 0.59,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725, // 化劲
        physicsShield: 408,
        magicShield: 0,
        primaryAttr: 'atStrengthBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10225': { // 田螺诡道
        attack: 1.75,
        crit: 0.57,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 0,
        magicShield: 462,
        primaryAttr: 'atSpunkBase',
        attackType: 'atPoisonAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPoisonOvercomeBase'
    },
    '10242': { // 焚影圣诀
        attack: 1.9,
        crit: 0.29,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 0,
        magicShield: 493,
        primaryAttr: 'atSpunkBase',
        attackType: 'atSolarAndLunarAttackPowerBase',
        critType: 'atSolarAndLunarCriticalStrike',
        critEffectType: 'atSolarAndLunarCriticalDamagePowerBase',
        overcomeType: 'atSolarAndLunarOvercomeBase'
    },
    '10268': { // 笑尘诀
        attack: 1.5, 
        overcome: 0.47,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725, // 化劲
        physicsShield: 493,
        magicShield: 0,
        primaryAttr: 'atStrengthBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10390': { // 分山劲
        attack: 1.71,
        parryBase: 0.1,
        parryValue: 1,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        primaryAttr: 'atAgilityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10447': { // 莫问
        attack: 1.85,
        crit: 0.38,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 0,
        physicsShield_addtional: 0,
        magicShield: 462,
        magicShield_addtional: 0,
        huajing: 1725,
        primaryAttr: 'atSpiritBase',
        attackType: 'atLunarAttackPowerBase',
        critType: 'atLunarCriticalStrike',
        critEffectType: 'atLunarCriticalDamagePowerBase',
        overcomeType: 'atLunarOvercomeBase'
    },
    '10464': { // 北傲诀
        attack: 1.55, 
        overcome: 0.36,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725, // 化劲
        physicsShield: 442,
        magicShield: 0,
        primaryAttr: 'atStrengthBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10585': { // 隐龙诀
        attack: 1.5,
        overcome: 0.47,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        primaryAttr: 'atAgilityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10615': { // 太玄经
        attack: 1.8,
        crit: 0.47,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        huajing: 1725,
        physicsShield: 0,
        magicShield: 231,
        primaryAttr: 'atSpunkBase',
        attackType: 'atNeutralAttackPowerBase',
        critType: 'atNeutralCriticalStrike',
        critEffectType: 'atNeutralCriticalDamagePowerBase',
        overcomeType: 'atNeutralOvercomeBase'
    },
    '10028': { // 离经易道
        heal: 1.85,
        crit: 0.38,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 578,
        physicsShield_addtional: 0,
        magicShield: 578,
        magicShield_addtional: 0,
        huajing: 1725,
        primaryAttr: 'atSpiritBase',
        attackType: 'atNeutralAttackPowerBase',
        critType: 'atNeutralCriticalStrike',
        critEffectType: 'atNeutralCriticalDamagePowerBase',
        overcomeType: 'atNeutralOvercomeBase'
    },
    '10080': { // 云裳心经
        heal: 1.75,
        crit: 0.21,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 578,
        physicsShield_addtional: 0,
        magicShield: 578,
        magicShield_addtional: 0,
        huajing: 1725,
        primaryAttr: 'atSpiritBase',
        attackType: 'atLunarAttackPowerBase',
        critType: 'atLunarCriticalStrike',
        critEffectType: 'atLunarCriticalDamagePowerBase',
        overcomeType: 'atLunarOvercomeBase'
    },
    '10176': { // 补天诀
        heal: 1.85,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 0,
        physicsShield_addtional: 0,
        magicShield: 578,
        magicShield_addtional: 0,
        huajing: 1725,
        primaryAttr: 'atSpiritBase',
        attackType: 'atPoisonAttackPowerBase',
        critType: 'atPoisonCriticalStrike',
        critEffectType: 'atPoisonCriticalDamagePowerBase',
        overcomeType: 'atPoisonOvercomeBase'
    },
    '10448': { // 相知
        heal: 1.7,
        crit: 0.31,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 0,
        physicsShield_addtional: 0,
        magicShield: 578,
        magicShield_addtional: 0,
        huajing: 1725,
        primaryAttr: 'atSpiritBase',
        attackType: 'atLunarAttackPowerBase',
        critType: 'atLunarCriticalStrike',
        critEffectType: 'atLunarCriticalDamagePowerBase',
        overcomeType: 'atLunarOvercomeBase'
    },
    '10002': { // 洗髓经
        health: 2.5,
        attack: 0.05,
        base: {
            health_override: 1.34,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 548,
        magicShield: 914,
        magicShield_addtional: 0.1,
    },
    '10062': { // 铁牢律
        health: 1.5,
        attack: 0.04,
        parryBase: 0.1,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 914,
        physicsShield_addtional: 0.1,
        magicShield: 0,
        magicShield_addtional: 0,
        primaryAttr: 'atVitalityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    },
    '10243': { // 明尊琉璃体
        health: 1.25,
        attack: 0.05,
        parryBase: 0.1,
        dodge: 0.225,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 457,
        physicsShield_addtional: 0.1,
        magicShield: 457,
        magicShield_addtional: 0,
        primaryAttr: 'atVitalityBase',
        attackType: 'atSolarAndLunarAttackPowerBase',
        critType: 'atSolarAndLunarCriticalStrike',
        critEffectType: 'atSolarAndLunarCriticalDamagePowerBase',
        overcomeType: 'atSolarAndLunarOvercomeBase'
    },
    '10389': { // 铁骨衣
        health: 2.2,
        attack: 0.04,
        parryValue: 0.5,
        parryBase: 0.15,
        base: {
            health_override: 1.22,
            physicsShield: 400,
            magicShield: 400
        },
        physicsShield: 548,
        physicsShield_addtional: 0,
        magicShield: 0,
        magicShield_addtional: 0,
        primaryAttr: 'atVitalityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    }
}

const XF_DECORATOR = {
    "10003": [ // 易筋经
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10014": [ // 紫霞功
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10015": [ // 太虚剑意 
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10021": [ // 花间
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    '10026': [ // 傲血战意
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10533": [ // 凌海诀
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10144": [ // 问水诀
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10145": [ // 山居剑意
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10390": [ // 分山劲
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10081": [ // 冰心诀
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10175": [ // 毒经
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10242": [ // 焚影圣诀
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10447": [ // 莫问
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10028": [ // 离经易道
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10080": [ // 云裳心经
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10176": [ // 补天诀
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10448": [ // 相知
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10002": [ // 洗髓经
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10615": [ // 太玄经
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10243": [ // 明尊琉璃体
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ],
    "10585": [ // 隐龙诀
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10224": [ // 惊羽诀
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10268": [ // 笑尘诀
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10464": [ // 北傲诀
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10062": [ // 铁牢律
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10389": [ // 铁骨衣
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10225": [ // 田螺诡道
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "MAGIC"]
    ],
}

const QIXUE = {
    'primary': [''],
    'heal': [],
    'atVitalityBase': [],
    'haste': []
}

export {
    PRE_DEFINED_EMBED_VALUES,
    VALUE_MAP,
    XF_DECORATOR,
    XF_FACTOR
}