import {getGrowScore} from './gs';
import {PRE_DEFINED_EMBED_VALUES, QIXUE, VALUE_MAP, XF_DECORATOR, XF_FACTOR, ENCHANTS} from '../assets/data/role_attr'

class RoleAttribute {
    constructor(equips, kungfu, person, set) {
        // 全局参数 - 意义不明
        this.globalCof = 205 * 110 - 18800;
        // 装备 心法 人物属性奇穴
        this.equips = equips || [];
        this.kungfu = kungfu || {};
        this.person = person || {};
        // 套装符合个数 { key: value }
        this.set = set || {};

        this.qiXueId = this.person.qiXueId.join(',');

        // 套装
        this.SET = {};

        this.BASE = {
            atVitalityBase: Number(person.atVitalityBase), // 体质
            atSpunkBase: Number(person.atSpunkBase), // 元气
            atSpiritBase: Number(person.atSpiritBase), // 根骨
            atStrengthBase: Number(person.atStrengthBase), // 力道
            atAgilityBase: Number(person.atAgilityBase), // 身法
        };

        this.initBase()

        this.primaryAttr = XF_FACTOR[kungfu.KungfuID]['primaryAttr'];
        this.primaryAttrVal = this.getTotalAttr(this.primaryAttr);
    }
    // 初始化基础属性
    initBase() {
        if (this.kungfu.KungfuID === "10145") {
            // 山居剑意
            this.equips = this.equips.filter(equip => equip.UcPos !== '0')
        }
        if (this.kungfu.KungfuID === "10144") {
            // 问水
            this.equips = this.equips.filter(equip => equip.UcPos !== '1')
        }
        this.equips.forEach(equip => {
            if (equip.SetID && equip.Set) {
                if (!this.SET[equip.SetID]) this.SET[equip.SetID] = equip.Set;
            }
        })
        let baseVal = 0;
        // XXX: 冬至套装会增加基础属性
        for (const [key, value] of Object.entries(this.SET)) {
            value.forEach(val => {
                if (val.Desc === 'atBasePotentialAdd') {
                    if (this.set[key] > 1) {
                        baseVal = Number(val.Param1Max) || 0;
                    }
                }
            })
        }
        for (const b in this.BASE) {
            if (this.BASE.hasOwnProperty(b)) {
                this.BASE[b] += baseVal
            }
        }
    }
    // 五彩石属性加成 需要单独维护 PRE_DEFINED_EMBED_VALUES 和 VALUE_MAP
    getFiveStoneAttr([attr, decorator], level) {
        if (level > 0) {
            if (attr === 'attack') {
                return decorator === 'PHYSICS'
                    ? PRE_DEFINED_EMBED_VALUES.physicsAttack[level - 1]
                    : PRE_DEFINED_EMBED_VALUES.magicAttack[level - 1];
            }
            return VALUE_MAP[attr][level -1] || 0;
        }
        return 0;
    }
    /**
     * 属性值 = 装备白字固定属性 + 装备基础属性 + 装备精炼成长属性 + 五行石属性 + 五彩石属性 + 附魔属性 + 心法基本属性
     * @param {string} attr 属性key
     */
    getTotalAttr(attr) {
        let equipAttr = 0; // 装备的属性

        const SETNUM = {}

        this.equips.forEach(equip => {
            // 装备白字固定属性，不随精炼而变化 内防 外访 远程伤害提高 速度 etc. 目前只有 3 个 base
            let baseAttr = 0;
            baseAttr += (equip.Base1Type && equip.Base1Type.Desc === attr) ? Number(equip.Base1Type.Base1Max) : 0;
            baseAttr += (equip.Base2Type && equip.Base2Type.Desc === attr) ? Number(equip.Base2Type.Base2Max) : 0;
            baseAttr += (equip.Base3Type && equip.Base3Type.Desc === attr) ? Number(equip.Base3Type.Base3Max) : 0;

            // 装备属性 白字和绿字固定属性 会随精炼而变化
            const [ modifyAttr ] = equip.ModifyType ? equip.ModifyType.filter(e => e.Desc === attr) : [];
            const growthBase = modifyAttr ? Number(modifyAttr.Param1Max) : 0; // 基础值
            const strengthLevel = equip.StrengthLevel; // 精炼等级
            const growthAttr = getGrowScore(growthBase, strengthLevel); // 成长值

            // 五行石
            const [ fiveStone ] = equip.FiveStone ? equip.FiveStone.filter(f => f.Desc === attr) : [];
            const attackAttr = attr.includes('AttackPowerBase') ? 'attack' : attr;
            const decorator = attr.includes('Physics') ? 'PHYSICS': 'MAGIC';
            const fiveStoneAttr = this.getFiveStoneAttr([ attackAttr, decorator ], (fiveStone && fiveStone.Level) || 0);

            // 五彩石 TODO 五彩石未激活情况未考虑
            const [ colorStone ] = equip.ColorStone ? equip.ColorStone.Attributes.filter(c => c.Desc === attr) : [];
            const colorStoneAttr = Number(colorStone && colorStone.Attribute1Value1) || 0;

            // 附魔

            const [ enchant ] = equip.WPermanentEnchant ?
                equip.WPermanentEnchant.Attributes.filter(w => w.Desc === attr) : [];
            
            const enchantAttr = Number(enchant && enchant.Attribute1Value1) || 0;

            
            equipAttr += baseAttr + growthBase + growthAttr + fiveStoneAttr + colorStoneAttr + enchantAttr;
        });

        // 切糕效果
        let setAttr = 0;

        // 四件套时的属性增加
        for (const key in this.SET) {
            if (this.set[key]) {
                if (this.set[key] >= 4) {
                    let temp;
                    this.SET[key].forEach(s => {
                        if (attr === s.Desc) {
                            // if (attr === 'atAllTypeCriticalStrike') console.log(s.Desc === attr)
                            temp = s
                        } 
                    })
                    setAttr = Number(temp && temp.Param1Max) || 0;
                } else if (this.set[key] >= 2 && this.set[key] < 4) {
                    if (this.SET[key][0].Desc === attr) {
                        let temp = this.SET[key][0];
                        setAttr = Number(temp && temp.Param1Max) || 0;
                    }
                }
            }
        }

        // 奇穴加成
        let qixue = '';
        for(const [key, value] of Object.entries(QIXUE)) {
            if (value.some(v => this.qiXueId.indexOf(v) !== -1)) {
                qixue = key;
                break;
            }
        }
        // 基础属性
        const xfAttr = this.BASE[attr] || 0;

        if (['primary', 'atVitality'].includes(qixue) && (attr === this.primaryAttr || attr === 'atVitalityBase')) {
            return Math.floor((xfAttr + equipAttr) * (1 + 102 / 1024));
        }

        return xfAttr + equipAttr + setAttr;
    }

    // 获取基础攻击力
    getBaseAttack() {
        const decoratedAttack = {
            PHYSICS: 0,
            MAGIC: 0
        }

        const kungfu = this.kungfu;

        // 力道加成 外功攻击 * 0.15
        decoratedAttack.PHYSICS = this.getTotalAttr('atStrengthBase') * 0.15;
        // 元气加成 内功攻击 * 0.18
        decoratedAttack.MAGIC = this.getTotalAttr('atSpunkBase') * 0.18;

        // 心法基础攻击
        const [attackDecorator] =  Object.keys(kungfu.Attrib).filter(a => a.includes('AttackPowerBase'));
        const xfAttack =  Number(kungfu.Attrib[attackDecorator]) || 0;

        // 内外功攻击类型
        const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'attack');

        // 具体攻击类型
        const attackType = XF_FACTOR[kungfu.KungfuID]['attackType'];

        // 大附魔 只有衣服加攻击 UcPos3
        let wtAttr = 0;
        const WTemporary = this.equips.find(equip => equip.UcPos === '3');

        if (WTemporary && WTemporary.WTemporaryEnchant) {
            const wtEnchantName = WTemporary.WTemporaryEnchant.Name
            if (decorator[1] === 'PHYSICS') {
                wtAttr = ENCHANTS[wtEnchantName] ? ENCHANTS[wtEnchantName][1] : 0
            } else if (decorator[1] === 'MAGIC') {
                wtAttr = ENCHANTS[wtEnchantName] ? ENCHANTS[wtEnchantName][0] : 0
            }
        }
        

        // 装备攻击 需要额外计算五彩石阴阳属性
        let equipAttack;

        if (decorator[1] === 'MAGIC') {
            // 区分一下阴阳内功
            equipAttack = this.getTotalAttr(attackType) + this.getTotalAttr('atMagicAttackPowerBase');

            if (attackType === 'atLunarAttackPowerBase' || attackType === 'atSolarAttackPowerBase') {
                // 当攻击类型为阴性或者阳性攻击时，需要额外加上阴阳攻击类型
                equipAttack += this.getTotalAttr('atSolarAndLunarAttackPowerBase');
            }
            if (attackType === 'atSolarAndLunarAttackPowerBase') {
                // 当攻击类型为阴阳攻击时，需要额外加上阴性和阳性攻击
                equipAttack += this.getTotalAttr('atLunarAttackPowerBase') + this.getTotalAttr('atSolarAttackPowerBase');
            }

            // console.log('MAGIC',this.getTotalAttr(attackType), this.getTotalAttr('atMagicAttackPowerBase'))
        } else {
            equipAttack = this.getTotalAttr(attackType);
        }

        // console.log('baseAttack', decoratedAttack[decorator[1]], xfAttack, equipAttack)

        // 七秀剑舞 朝露 XXX hard code
        if (this.kungfu.KungfuID === '10081') {
            let isZhaolu = 0;
            if (this.person && this.person.qixueList.length) {
                isZhaolu = this.person.qixueList.map(q => q.skill_id).some(_q => _q === '6779') ? 10/1024 : 0
            }
            
            return Math.floor((decoratedAttack[decorator[1]] + xfAttack + equipAttack + wtAttr) * (1 + (31 / 1024 +  + isZhaolu) * 10));
        }

        return Math.floor(decoratedAttack[decorator[1]] + xfAttack + equipAttack + wtAttr);
    }

    /**
     * 获取面板攻击力
     * @returns 基础攻击力 + 心法额外加成
     */
    getAttack() {
        const primaryAttack = this.primaryAttrVal * (XF_FACTOR[this.kungfu.KungfuID]['attack'] || 0);

        // console.log('attack', this.getBaseAttack(), primaryAttack)

        return Math.floor(this.getBaseAttack() + primaryAttack);
    }
    /**
     * 会心等级 = 身法/根骨加成 + 心法基础会心 + 装备会心 + 主属性会心加成
     */
    getCrit() {
        const decoratedCrit = {
            PHYSICS: 0,
            MAGIC: 0
        }
        const kungfu = this.kungfu;

        // 身法加成 外功会心 * 0.64
        decoratedCrit.PHYSICS = this.getTotalAttr('atAgilityBase') * 0.64;
        // 根骨加成 内功会心 * 0.64
        decoratedCrit.MAGIC = Math.floor(this.getTotalAttr('atSpiritBase') * 0.64);

        // 心法基础会心
        const [ critDecorator ] =  Object.keys(kungfu.Attrib).filter(a => a.includes('CriticalStrike'));
        const xfCrit =  Number(kungfu.Attrib[critDecorator]) || 0;

        // 会心等级类型 内外
        const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'crit');

        // 具体会心类型
        const critType = XF_FACTOR[kungfu.KungfuID]['critType'];

        // 装备会心等级
        let equipCrit;

        if (decorator[1] === 'MAGIC') {
            equipCrit = this.getTotalAttr(critType) + this.getTotalAttr('atMagicCriticalStrike');
        } else {
            equipCrit = this.getTotalAttr(critType);
        }

        // 装备全会心等级
        const allEquipCrit = this.getTotalAttr('atAllTypeCriticalStrike');

        // 心法加成会心等级
        const primaryCrit = this.primaryAttrVal * (XF_FACTOR[this.kungfu.KungfuID]['crit'] || 0);

        console.log('crit', decoratedCrit[decorator[1]], xfCrit, equipCrit, allEquipCrit, primaryCrit);

        console.log(decoratedCrit[decorator[1]] + xfCrit + equipCrit + allEquipCrit + primaryCrit)

        return Math.floor(decoratedCrit[decorator[1]] + xfCrit + equipCrit + allEquipCrit + primaryCrit);
    }

    // 会心率
    getCritRate() {
        // 如果心法为鲸鱼或者田螺
        const flag = Number(['10224', '10225'].includes(this.kungfu.KungfuID));

        const cof = (9.530 * this.globalCof) / 100;
        return `${(this.getCrit() / cof + flag).toFixed(2)}%`;
    }

    /**
     * 会效等级 = 心法基础会效 + 装备会效 + 主属性会效加成
     */
    getCritEffect() {
        const kungfu = this.kungfu;
        // 心法基础会效
        const [critEffectDecorator] =  Object.keys(kungfu.Attrib).filter(a => a.includes('CriticalDamagePowerBase'));
        const xfCritEffect =  Number(kungfu.Attrib[critEffectDecorator]) || 0;

        // 会效等级内外类型
        const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'critEffect');

        // 具体会效类型
        const critEffectType = XF_FACTOR[kungfu.KungfuID]['critEffectType'];

        // 装备会效
        let equipCritEffect;

        if (decorator[1] === 'MAGIC') {
            equipCritEffect = this.getTotalAttr(critEffectType) + this.getTotalAttr('atMagicCriticalDamagePowerBase');
        } else {
            equipCritEffect = this.getTotalAttr(critEffectType);
        }

        // 装备全会效
        const allEquipCritEffect = this.getTotalAttr('atAllTypeCriticalDamagePowerBase');

        // 心法会效加成
        const primaryCritEffect = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['critEffect'] || 0);

        // console.log(xfCritEffect, equipCritEffect, allEquipCritEffect, primaryCritEffect)

        return Math.round(xfCritEffect + equipCritEffect + allEquipCritEffect + primaryCritEffect)
    }
    // 会效
    getCritEffectRate() {
        const critEffect = this.getCritEffect()
        const cof = (3.335 * this.globalCof) / 100;
        return `${(175 + critEffect / cof).toFixed(2)}%`;
    }

    // 加速等级 = 装备加速等级 + 主属性加速等级加成
    getHaste() {
        const primaryHaste = this.primaryAttrVal * (XF_FACTOR[this.kungfu.KungfuID]['haste'] || 0);

        const equipHaste = this.getTotalAttr('atHasteBase');

        return Math.round(primaryHaste + equipHaste)
    }

    // 加速率
    getHasteRate() {
        const cof = (11.695 * this.globalCof) / 100;
        const haste = this.getHaste();
        return `${(Math.min(haste / cof, 25)).toFixed(2)}%`;
    }

    // 基础破防
    getBaseOvercome() {
        const decoratedOvercome = {
            PHYSICS: 0,
            MAGIC: 0
        };

        const kungfu = this.kungfu;

        // 力道 外功破防 * 0.3
        decoratedOvercome.PHYSICS = this.getTotalAttr('atStrengthBase') * 0.3;

        // 元气 内功破防 * 0.3
        decoratedOvercome.MAGIC = this.getTotalAttr('atSpunkBase') * 0.3;

        // 心法基础破防
        const [overcomeDecorator] = Object.keys(kungfu.Attrib).filter(o => o.includes('OvercomeBase'));
        const xfOvercome = Number(kungfu.Attrib[overcomeDecorator]) || 0;

        // 破防类型 内外
        const decorator = XF_DECORATOR[kungfu.KungfuID].find(d => d[0] === 'overcome');

        // 具体破防类型
        const overcomeType = XF_FACTOR[kungfu.KungfuID]['overcomeType'];

        // 大附魔破防
        let wtAttr = 0;
        const WTemporary = this.equips.find(equip => equip.UcPos === '4');

        if (WTemporary && WTemporary.WTemporaryEnchant) {
            const wtEnchantName = WTemporary.WTemporaryEnchant.Name
            if (decorator[1] === 'PHYSICS') {
                wtAttr = ENCHANTS[wtEnchantName] ? ENCHANTS[wtEnchantName][1] : 0
            } else if (decorator[1] === 'MAGIC') {
                wtAttr = ENCHANTS[wtEnchantName] ? ENCHANTS[wtEnchantName][0] : 0
            }
        }

        // 装备破防
        let equipOvercome;

        if (decorator[1] === 'MAGIC') {
            equipOvercome = this.getTotalAttr(overcomeType) + this.getTotalAttr('atMagicOvercome');
        } else {
            equipOvercome = this.getTotalAttr(overcomeType);
        }

        return Math.round(decoratedOvercome[decorator[1]] + xfOvercome + equipOvercome + wtAttr)
    }

    /**
     * 破防 = 力道/元气破防加成 + 心法基础破防 + 装备破防 + 主属性破防加成 + 大附魔加成
     */
    getOvercome() {
        // 主属性破防加成
        const primaryOvercome = this.primaryAttrVal * (XF_FACTOR[this.kungfu.KungfuID]['overcome'] || 0);

        return Math.round(this.getBaseOvercome() + primaryOvercome)
    }
    // 破防
    getOvercomeRate() {
        const overcome = this.getOvercome();
        const cof = (9.530 * this.globalCof) / 100;

        return `${(overcome / cof).toFixed(2)}%`;
    }

    // 无双等级
    getStrain() {
        const kungfu = this.kungfu;
        // 装备无双
        const equipStrain = this.getTotalAttr('atStrainBase');

        // 主属性无双加成
        const primaryStrain = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['strain'] || 0)

        return equipStrain + primaryStrain;
    }
    // 无双率
    getStrainRate() {
        const strain = this.getStrain();
        const cof = (9.189 * this.globalCof) / 100;
        return `${(strain / cof).toFixed(2)}%`;
    }
    // 破招
    getSurplus() {
        const kungfu = this.kungfu;
        // 装备破招
        const equipSurplus = this.getTotalAttr('atSurplusValueBase');

        // 主属性破招加成
        const primarySurplus = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['surplus'] || 0);

        return equipSurplus + primarySurplus;
    }

    // 气血值 TODO: 血量仍有部分不正确的  fuyan藏剑
    getHealth() {
        const kungfu = this.kungfu;
        const cof = Math.round((XF_FACTOR[this.kungfu.KungfuID]['base']['health_override']) * 1024) / 1024;

        const equipHealth = this.getTotalAttr('atMaxLifeAdditional') + this.getTotalAttr('atMaxLifeBase');

        const primaryHealth = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['health'] || 0);

        // 和尚 明王身 20% 基础气血
        if (this.kungfu.KungfuID === '10002') {
            let isMingwang = 0;
            if (this.person && this.person.qixueList.length) {
                isMingwang = this.person.qixueList.map(q => q.skill_id).some(_q => _q === '5930') ? 220/1024 : 0;
            }
            return Math.floor(primaryHealth + equipHealth + ((this.getTotalAttr('atVitalityBase') * 10 + 23766) * (cof + isMingwang)))
        }
        // 其他10%基础气血的加成奇穴
        if (this.person && this.person.qixueList.length) {
            const skills = this.person.qixueList.map(q => q.skill_id);
            if (QIXUE.health.some(h => skills.includes(h))) {
                return Math.floor(primaryHealth + equipHealth + ((this.getTotalAttr('atVitalityBase') * 10 + 23766) * (cof + 102 / 1024)));
            }
        }

        const health = (this.getTotalAttr('atVitalityBase') * 10 + 23766) * cof
            + primaryHealth + equipHealth;

        return Math.floor(health);
    }

    // 外防等级
    getPhysicsShield() {
        const kungfu = this.kungfu;
        // 装备外防
        const equipPhysicsShield = this.getTotalAttr('atPhysicsShieldBase') + this.getTotalAttr('atPhysicsShieldAdditional');

        // 主属性加成外防
        const primaryPhysicsShield = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['physicsShield_addtional'] || 0);

        // 奇穴加成  天策勤王 洗髓生缘 20% 外防
        if (this.person && this.person.qixueList.length) {
            const skills = this.person.qixueList.map(q => q.skill_id)
            if (QIXUE.shield.some(h => skills.includes(h))) {
               return (XF_FACTOR[kungfu.KungfuID]['base']['physicsShield'] + equipPhysicsShield + (XF_FACTOR[kungfu.KungfuID]['physicsShield'] || 0))
                    * (1 + 204/1024) + primaryPhysicsShield
            }
        }

        return XF_FACTOR[kungfu.KungfuID]['base']['physicsShield'] + equipPhysicsShield
            + primaryPhysicsShield
            + (XF_FACTOR[kungfu.KungfuID]['physicsShield'] || 0);
    }
    // 外功防御
    getPhysicsShieldRate() {
        const physicsShield = this.getPhysicsShield();
        const cof = 5.091 * this.globalCof;

        return `${((physicsShield / (physicsShield + cof)) * 100).toFixed(2)}%`;
    }

    // 内防等级
    getMagicShield() {
        const kungfu = this.kungfu;
        // 装备内防
        const equipMagicShield = this.getTotalAttr('atMagicShield');

        // 主属性内防加成
        const primaryMagicShield = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['magicShield_addtional'] || 0);

        // 奇穴加成  天策勤王 洗髓生缘 20% 内防
        if (this.person && this.person.qixueList.length) {
            const skills = this.person.qixueList.map(q => q.skill_id)
            if (QIXUE.shield.some(h => skills.includes(h))) {
               return ((XF_FACTOR[kungfu.KungfuID]['base']['magicShield'] || 0) + equipMagicShield + (XF_FACTOR[kungfu.KungfuID]['magicShield'] || 0))
                    * (1 + 204/1024) + primaryMagicShield
            }
        }


        return XF_FACTOR[kungfu.KungfuID]['base']['magicShield'] + equipMagicShield
            + primaryMagicShield
            + (XF_FACTOR[kungfu.KungfuID]['magicShield'] || 0);
    }
    // 内功功防御
    getMagicShieldRate() {
        const magicShield = this.getMagicShield();
        const cof = 5.091 * this.globalCof;

        return `${((magicShield / (magicShield + cof)) * 100).toFixed(2)}%`;
    }

    // 闪躲
    getDodge() {
        const kungfu = this.kungfu;
        const equipDodge = this.getTotalAttr('atDodge');

        // 主属性闪躲加成
        const primaryDodge = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['dodge_addtional'] || 0);

        // console.log('dodge', primaryDodge, equipDodge, (XF_FACTOR[kungfu.KungfuID]['dodge'] || 0))

        return Math.round(equipDodge + primaryDodge + (XF_FACTOR[kungfu.KungfuID]['dodge'] || 0))
    }
    // 闪躲率
    getDodgeRate() {
        const cof = 4.628 * this.globalCof;
        const dodge = this.getDodge();
        return `${((dodge / (cof + dodge)) * 100).toFixed(2)}%`;
    }

    // 招架 针对于苍云 ，可能会有少许数值的差异
    getParryBase() {
        const kungfu = this.kungfu;
        const equipParryBase = this.getTotalAttr('atParryBase');

        // 主属性
        const primaryParryBase = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['parryBase_addtional'] || 0);

        // console.log('parryBase', equipParryBase, primaryParryBase, (XF_FACTOR[kungfu.KungfuID]['parryBase'] || 0));

        return Math.round(equipParryBase + primaryParryBase + (XF_FACTOR[kungfu.KungfuID]['parryBase'] || 0));
    }
    // 招架率
    getParryBaseRate() {
        const cof = 4.345 * this.globalCof;
        const parryBase = this.getParryBase()
        return `${(3 + (parryBase / (cof + parryBase)) * 100).toFixed(2)}%`;
    }
    // 拆招
    getParryValue() {
        const kungfu = this.kungfu;
        const equipParryValue = this.getTotalAttr('atParryValueBase');

        // 主属性
        const primaryParryValue = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['parryValue_addtional'] || 0)

        return Math.round(equipParryValue + primaryParryValue + (XF_FACTOR[kungfu.KungfuID]['parryValue'] || 0))
    }

    // 御劲等级
    getToughness() {
        const kungfu = this.kungfu;
        const equipToughness = this.getTotalAttr('atToughnessBase');

        // 主属性
        const primaryToughness = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['toughness'] || 0);

        return Math.round(equipToughness + primaryToughness)
    }
    // 御劲
    getToughnessRate() {
        const cof = 9.530 * this.globalCof;
        const toughness = this.getToughness();
        return `${((toughness / cof) * 100).toFixed(2)}%`;
    }
    // 化劲等级
    getHuajing() {
        const kungfu = this.kungfu;
        const equipHuajing = this.getTotalAttr('atDecriticalDamagePowerBase');

        // 主属性
        const primaryHuajing = this.primaryAttrVal * (XF_FACTOR[kungfu.KungfuID]['huajing_addtional'] || 0)

        const huajing = (XF_FACTOR[kungfu.KungfuID]['huajing'] || 0) + equipHuajing + primaryHuajing;

        return Math.round(huajing)
    }
    // 化劲
    getHuajingRate() {
        const cof = 1.380 * this.globalCof;
        const huajing = this.getHuajing();
        return `${((huajing / (cof + huajing)) * 100).toFixed(2)}%`;
    }

    // 疗效
    getBaseHeal() {
        const kungfu = this.kungfu;
        const equipHeal = this.getTotalAttr('atTherapyPowerBase');

        // 心法基础疗伤成效
        const [healDecorator] = Object.keys(kungfu.Attrib).filter(o => o.includes('atTherapyPowerBase'));
        const xfHeal = Number(kungfu.Attrib[healDecorator]) || 0;

        // 七秀剑舞 如果是云裳心经
        if (this.kungfu.KungfuID === '10080') {
            return Math.round((equipHeal + xfHeal) * (1 + 31 / 1024 * 10));
        }

        return Math.round(equipHeal + xfHeal);
    }

    // 疗效
    getHeal() {
        const primaryHeal = this.primaryAttrVal * (XF_FACTOR[this.kungfu.KungfuID]['heal'] || 0);

        // console.log('primaryHeal', this.getBaseHeal(), this.primaryAttrVal * (XF_FACTOR[this.kungfu.KungfuID]['heal'] || 0))

        return Math.round(this.getBaseHeal() + primaryHeal);
    }

    // 武器伤害
    getWeaponDamage() {
        const equipWeaponDamage = this.getTotalAttr('atMeleeWeaponDamageBase');

        return equipWeaponDamage;
    }

}

export default RoleAttribute
