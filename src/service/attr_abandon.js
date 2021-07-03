import { getGrowScore } from './gs';
import enchants from '../assets/data/enchants.json';
// 属性计算

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
    '10390': { // 分山劲
        attack: 1.71,
        primaryAttr: 'atAgilityBase',
        attackType: 'atPhysicsAttackPowerBase',
        critType: 'atPhysicsCriticalStrike',
        critEffectType: 'atPhysicsCriticalDamagePowerBase',
        overcomeType: 'atPhysicsOvercomeBase'
    }
}

const XF_DECORATOR = {
    "10533": [
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10390": [
        ["attack", "PHYSICS"],
        ["hit", "PHYSICS"],
        ["crit", "PHYSICS"],
        ["critEffect", "PHYSICS"],
        ["overcome", "PHYSICS"]
    ],
    "10081": [
        ["attack", "MAGIC"],
        ["hit", "MAGIC"],
        ["crit", "MAGIC"],
        ["critEffect", "MAGIC"],
        ["overcome", "MAGIC"]
    ]
}

const globalCof = 205 * 110 - 18800;

function getFiveStoneScore([attr, decorator], level) {
    if (level > 0) {
        if (attr === 'attack') {
            return decorator === 'PHYSICS'
                    ? PRE_DEFINED_EMBED_VALUES.physicsAttack[level - 1]
                    : PRE_DEFINED_EMBED_VALUES.magicAttack[level - 1];
        }
        return VALUE_MAP[attr][level -1] || 0
    }
    return 0
}

/**
 * 获取主要属性数值
 * @description 主要属性 = 装备属性 + 基础属性 + 五彩石属性 + 附魔属性
 * @param {Array} equips 装备
 * @param {string} attr 属性 key
 * @returns 
 */
function getPrimaryAttribute(equips, attr) {
    let equipAttr = 0;
    let colorAttr = 0;

    equips.forEach(equip => {
        // 装备基本属性
        let base = 0;
        base += (equip.Base1Type && equip.Base1Type.Desc === attr) ? Number(equip.Base1Type.Base1Max) : 0;
        base += (equip.Base2Type && equip.Base2Type.Desc === attr) ? Number(equip.Base2Type.Base2Max) : 0;
        base += (equip.Base3Type && equip.Base3Type.Desc === attr) ? Number(equip.Base3Type.Base3Max) : 0;
        // console.log(equip.Name, attr, base)
        // 装备属性
        const [ modifyAttr ] = equip.ModifyType.filter(e => e.Desc === attr);
        // 五行石
        const [ fiveStone ] = equip.FiveStone ? equip.FiveStone.filter(f => f.Desc === attr) : [];
        // 五彩石
        const [ colorStone ] = equip.ColorStone ? equip.ColorStone.Attributes.filter(c => c.Desc === attr) : [];
        
        const color_stone = Number(colorStone && colorStone.Attribute1Value1) || 0;

        // 附魔
        const [ WPermanentEnchant ] = equip.WPermanentEnchant ?
            equip.WPermanentEnchant.Attributes.filter(w => w.Desc === attr) : [];

        const wpAttrValue = Number(WPermanentEnchant && WPermanentEnchant.Attribute1Value1) || 0;

        const attackAttr = attr.includes('PowerBase') ? 'attack' : attr;

        const decorator = attr.includes('Physics') ? 'PHYSICS': 'MAGIC';
        
        let fiveStoneScore = getFiveStoneScore([ attackAttr, decorator ], (fiveStone && fiveStone.Level) || 0);

        const Param1Max = modifyAttr ? Number(modifyAttr.Param1Max) : 0;

        const StrengthLevel = equip.StrengthLevel;

        equipAttr += Param1Max + getGrowScore(Param1Max, StrengthLevel) + fiveStoneScore + color_stone + wpAttrValue + base;

        // console.log(Param1Max, getGrowScore(Param1Max, StrengthLevel), fiveStoneScore, wpAttrValue)
    })

    const baseAttr = BASE[attr] ? BASE[attr] : 0;

    // console.log(baseAttr, equipAttr, colorAttr)

    return baseAttr + equipAttr + colorAttr
}


// 获取基础攻击力
function getBaseAttack(equips, kungfu) {
    const decoratedAttack = {
        MAGIC: 0,
        PHYSICS: 0
    };

    // 力道 外功攻击 * 0.15
    decoratedAttack.PHYSICS = getPrimaryAttribute(equips, 'atStrengthBase') * 0.15;

    // 元气 内功攻击 * 0.18
    decoratedAttack.MAGIC = getPrimaryAttribute(equips, 'atSpunkBase') * 0.18;

    // 心法基础攻击
    const [attackDecorator] =  Object.keys(kungfu.Attrib).filter(a => a.includes('AttackPowerBase'));
    const xfAttack =  Number(kungfu.Attrib[attackDecorator]) || 0;
    
    // 攻击类型
    const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'attack');

    // 具体攻击类型

    const attackType = XF_FACTOR[kungfu.KungfuID]['attackType']

    // 装备攻击
    let equipAttack = 0;

    if (decorator[1] === 'MAGIC') {
        equipAttack = getPrimaryAttribute(equips, attackType) + getPrimaryAttribute(equips, 'atMagicAttackPowerBase');
    } else {
        equipAttack = getPrimaryAttribute(equips, attackType)
    }

    // console.log(equipAttack, xfAttack, decoratedAttack[decorator[1]])

    return equipAttack + xfAttack + decoratedAttack[decorator[1]]
}

/**
 * 面板攻击
 * @description 面板攻击 = 基础攻击 + 主属性点数 * 特性成长系数
 */
function getAttack([equips, kungfu]) {
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];

    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    // 主属性攻击
    const primaryAttack = primaryAttrValue * XF_FACTOR[kungfu.KungfuID]['attack'];

    const totalPhysicsAttack = getBaseAttack(equips, kungfu) + primaryAttack;

    return Math.round(totalPhysicsAttack)
}

// 获取会心|会效类型
function getCritType(kungfuID, type = 'crit') {
    return type === 'crit' ? XF_FACTOR[kungfuID]['critType'] : XF_FACTOR[kungfuID]['critEffectType']
}

// 会心等级 = 装备会心 + 基础会心（内外功对应根骨身法） + 心法提供的基本会心 + 心法主属性加成
function getCrit(equips, kungfu) {
    const decoratedCrit = {
        MAGIC: 0,
        PHYSICS: 0
    };
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);
    
    // 根骨 内功会心 * 0.64
    decoratedCrit.MAGIC = getPrimaryAttribute(equips, 'atSpiritBase') * 0.64;

    // 身法 外功会心 * 0.64
    decoratedCrit.PHYSICS = getPrimaryAttribute(equips, 'atAgilityBase') * 0.64;

    // 心法基础会心
    const [critDecorator] =  Object.keys(kungfu.Attrib).filter(a => a.includes('CriticalStrike'));
    const xfCrit =  Number(kungfu.Attrib[critDecorator]) || 0;

    // 会心等级类型
    const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'crit');

    // 装备会心等级
    let equipCrit = 0;

    const critType = getCritType(kungfu.KungfuID);
    
    if (decorator[1] === 'MAGIC') {
        equipCrit = getPrimaryAttribute(equips, critType) + getPrimaryAttribute(equips, 'atMagicCriticalStrike');
    } else {
        equipCrit = getPrimaryAttribute(equips, critType);
    }

    // 全会心等级 XXX: 可能会有问题
    const allEquipCrit = getPrimaryAttribute(equips, 'atAllTypeCriticalStrike');

    const crit = primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['crit'] || 0)
        + equipCrit + allEquipCrit + decoratedCrit[decorator[1]] + xfCrit;

    return Math.round(crit);
}

// 会心率
function getCritRate(equips, kungfu) {
    const crit = getCrit(equips, kungfu)
    const cof = (9.530 * globalCof) / 100;
    return `${(crit / cof).toFixed(2)}%`;
}

/**
 * 会效等级
 * @param {*} equips 
 * @param {*} kungfu 
 */
function getCritEffect(equips, kungfu) {
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    // 心法基础会效
    const [critDecorator] =  Object.keys(kungfu.Attrib).filter(a => a.includes('CriticalDamagePowerBase'));
    const xfCritEffect =  Number(kungfu.Attrib[critDecorator]) || 0;

    // 会效等级
    const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'critEffect');

    // 心法会效等级
    let equipCritEffect = 0;

    const critEffectType = getCritType(kungfu.KungfuID, 'critEffect');
    
    if (decorator[1] === 'MAGIC') {
        equipCritEffect = getPrimaryAttribute(equips, critEffectType) + getPrimaryAttribute(equips, 'atMagicCriticalDamagePowerBase');
    } else {
        equipCritEffect = getPrimaryAttribute(equips, critEffectType);
    }

    // 全会心效果等级 XXX: 可能会有问题
    const allEquipCritEffect = getPrimaryAttribute(equips, 'atAllTypeCriticalDamagePowerBase');

    const critEffect = primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['critEffect'] || 0)
    + allEquipCritEffect + equipCritEffect  + xfCritEffect;

    // console.log(primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['critEffect'] || 0), allEquipCritEffect, equipCritEffect, xfCritEffect)
        
    return Math.round(critEffect);
}

// 会心效果
function getCritEffectRate(equips, kungfu) {
    const critEffect = getCritEffect(equips, kungfu)
    const cof = (3.335 * globalCof) / 100;
    return `${(175 + critEffect / cof).toFixed(2)}%`;
}

// 加速等级
function getHaste(equips, kungfu) {
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);
 
    const haste = getPrimaryAttribute(equips, 'atHasteBase') + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['haste'] || 0);

    // console.log(getPrimaryAttribute(equips, 'atHasteBase'), primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['haste'] || 0))
    return Math.round(haste)
}

// 加速率
function getHasteRate(equips, kungfu) {
    const cof = (11.695 * globalCof) / 100;
    const haste = getHaste(equips, kungfu);
    return `${(Math.min(haste / cof, 25)).toFixed(2)}%`;
}

function getOvercomeType(kungfuID) {
    return XF_FACTOR[kungfuID]['overcomeType']
}

// 破防等级 = 基本破防 + 心法破防
function getOvercome(equips, kungfu) {
    const decoratedOvercome = {
        MAGIC: 0,
        PHYSICS: 0
    };
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    // 力道 外功破防 * 0.3
    decoratedOvercome.PHYSICS = getPrimaryAttribute(equips, 'atStrengthBase') * 0.3;

    // 元气 内功破防 * 0.3
    decoratedOvercome.MAGIC = getPrimaryAttribute(equips, 'atSpunkBase') * 0.3;

    // 心法基础破防
    const [overcomeDecorator] = Object.keys(kungfu.Attrib).filter(o => o.includes('OvercomeBase'));
    const xfOvercome = Number(kungfu.Attrib[overcomeDecorator]) || 0;

    // 破防等级
    const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'overcome');

    // todo 大附魔会有额外破防

    // 心法破防等级
    let equipOvercome = 0;

    const overcomeType = getOvercomeType(kungfu.KungfuID);

    if (decorator[1] === 'MAGIC') {
        equipOvercome = getPrimaryAttribute(equips, overcomeType) + getPrimaryAttribute(equips, 'atMagicOvercome');
    } else {
        equipOvercome = getPrimaryAttribute(equips, overcomeType);
    }

    const overcome = primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['overcome'] || 0)
        + equipOvercome + decoratedOvercome[decorator[1]] + xfOvercome;

    // console.log(primaryAttrValue, (XF_FACTOR[kungfu.KungfuID]['overcome']));

    // console.log(primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['overcome'] || 0), equipOvercome, decoratedOvercome[decorator[1]], xfOvercome)

    return Math.round(overcome);
}
// 破防率
function getOvercomeRate(equips, kungfu) {
    const overcome = getOvercome(equips, kungfu);
    const cof = (9.530 * globalCof) / 100;

    return `${(overcome / cof).toFixed(2)}%`;
}

// 无双等级
function getStrain(equips, kungfu) {
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    const strain = getPrimaryAttribute(equips, 'atStrainBase') + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['strain'] || 0);

    return strain;
}
// 无双率
function getStrainRate(equips, kungfu) {
    const strain = getStrain(equips, kungfu)
    const cof = (9.189 * globalCof) / 100;
    return `${(strain / cof).toFixed(2)}%`;
}
// 破招
function getSurplus(equips, kungfu) {
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    const surplus = getPrimaryAttribute(equips, 'atSurplusValueBase') + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['surplus'] || 0);

    return surplus;
}
// 气血值
function getHealth(equips, kungfu) {
    const cof = Math.round((XF_FACTOR[kungfu.KungfuID]['base']['health_override']) * 1024) / 1024;

    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    const equipHealth = getPrimaryAttribute(equips, 'atMaxLifeAdditional');

    // console.log((getPrimaryAttribute(equips, 'atVitalityBase') * 10 + 23766) * cof, equipHealth)

    const health = (getPrimaryAttribute(equips, 'atVitalityBase') * 10 + 23766) * cof
        + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['health'] || 0) + equipHealth

    return Math.floor(health);
}

// 外防等级
function getPhysicsSheild(equips, kungfu) {
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    // 装备外防
    const equipPhysicsShield = getPrimaryAttribute(equips, 'atPhysicsShieldBase');

    const physicsShield = XF_FACTOR[kungfu.KungfuID]['base']['physicsShield'] + equipPhysicsShield
        + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['physicsShield_addtional'] || 0)
        + (XF_FACTOR[kungfu.KungfuID]['physicsShield'] || 0);

    return physicsShield;
}
// 外功防御
function getPhysicsSheildRate(equips, kungfu) {
    const physicsShield = getPhysicsSheild(equips, kungfu);
    const cof = 5.091 * globalCof;

    return `${((physicsShield / (physicsShield + cof)) * 100).toFixed(2)}%`;
}
// 内防等级
function getMagicSheild(equips, kungfu) {
    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    // 装备内防
    const equipMagicShield = getPrimaryAttribute(equips, 'atMagicShield');

    const magicShield = XF_FACTOR[kungfu.KungfuID]['base']['magicShield'] + equipMagicShield
        + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['magicShield_addtional'] || 0)
        + (XF_FACTOR[kungfu.KungfuID]['magicShield'] || 0);

    // console.log(XF_FACTOR[kungfu.KungfuID]['base']['magicShield'], equipMagicShield, primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['magicShield'] || 0))

    return magicShield;
}
// 内功功防御
function getMagicSheildRate(equips, kungfu) {
    const magicShield = getMagicSheild(equips, kungfu);
    const cof = 5.091 * globalCof;

    return `${((magicShield / (magicShield + cof)) * 100).toFixed(2)}%`;
}

// 闪躲
function getDodge(equips, kungfu) {
    const equipDodge = getPrimaryAttribute(equips, 'atDodge');

    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    return Math.round(equipDodge + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['dodge'] || 0))
}
// 闪躲率
function getdodgeRate(equips, kungfu) {
    const cof = 4.628 * globalCof;
    const dodge = getDodge(equips, kungfu);
    return `${((dodge / (cof + dodge)) * 100).toFixed(2)}%`;
}

// 招架
function getParryBase(equips, kungfu) {
    const equipParryBase = getPrimaryAttribute(equips, 'atParryBase');

    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    return Math.round(equipParryBase + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['parryBase'] || 0))
}
// 招架率
function getParryBaseRate(equips, kungfu) {
    const cof = 4.345 * globalCof;
    const parryBase = getParryBase(equips, kungfu)
    return `${(3 + (parryBase / (cof + parryBase)) * 100).toFixed(2)}%`;
}
// 拆招
function getParryValue(equips, kungfu) {
    const equipParryValue = getPrimaryAttribute(equips, 'atParryValueBase');

    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    return Math.round(equipParryValue + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['parryValue'] || 0))
}

// 御劲
function getToughness(equips, kungfu) {
    const equipToughness = getPrimaryAttribute(equips, 'atToughnessBase');

    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    return Math.round(equipToughness + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['toughness'] || 0))
}
function getToughnessRate(equips, kungfu) {
    const cof = 9.530 * globalCof;
    const toughness = getToughness(equips, kungfu);
    return `${((toughness / cof) * 100).toFixed(2)}%`;
}
// 化劲
function getHuajing(equips, kungfu) {
    const equipHuajing = getPrimaryAttribute(equips, 'atDecriticalDamagePowerBase');

    // 主属性
    const primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
    
    // 主属性值
    const primaryAttrValue = getPrimaryAttribute(equips, primaryAttr);

    const huajing = XF_FACTOR[kungfu.KungfuID]['huajing'] + equipHuajing + primaryAttrValue * (XF_FACTOR[kungfu.KungfuID]['huajing_addtional'] || 0)

    // console.log(XF_FACTOR[kungfu.KungfuID]['huajing'], equipHuajing, )
    return Math.round(huajing)
}

function getHuajingRate(equips, kungfu) {
    const cof = 1.380 * globalCof;
    const huajing = getHuajing(equips, kungfu);
    return `${((huajing / (cof + huajing)) * 100).toFixed(2)}%`;
}

export {
    getPrimaryAttribute,
    getAttack,
    getCritRate,
    getCritEffectRate,
    getHaste,
    getHasteRate,
    getOvercome,
    getOvercomeRate,
    getStrain,
    getStrainRate,
    getSurplus,
    getHealth,
    getPhysicsSheild,
    getPhysicsSheildRate,
    getMagicSheild,
    getMagicSheildRate,
    getParryBaseRate,
    getParryValue,
    getToughnessRate,
    getHuajingRate
}