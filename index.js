const xml = `
<statBases>
        <MarketValue>3400</MarketValue><!-- if the market value is not somewhere between 3000 and 3500 stellic defenders will not spawn with them -->
        <Mass>5.6</Mass>
        <AccuracyTouch> 1.04</AccuracyTouch> <!-- increase all accuracy by 10% and reduce ranged cooldown and warmup time by 10%~25% split between both -->
        <AccuracyShort> 0.57</AccuracyShort>
        <AccuracyMedium>0.19</AccuracyMedium>
        <AccuracyLong>  0.02</AccuracyLong>
        <RangedWeapon_Cooldown>1.12</RangedWeapon_Cooldown>
    </statBases>
`
const xml2 =`
<verbs>
    <li>
        <verbClass>Verb_Shoot</verbClass>
        <hasStandardCommand>true</hasStandardCommand>
        <defaultProjectile>Bullet_MoyoAutoCannon_Bond</defaultProjectile>
        <ticksBetweenBurstShots>13</ticksBetweenBurstShots>
        <burstShotCount>6</burstShotCount>	
        <warmupTime>2</warmupTime>
        <range>30.5</range>
        <soundCast>Shot_Autocannon</soundCast>
        <soundCastTail>GunTail_Heavy</soundCastTail>
        <muzzleFlashScale>11</muzzleFlashScale>
    </li>
</verbs>
`

const convert = require('xml-js');
const op = require('object-path');
//console.log("input -> %s", xml)

var json = convert.xml2js(xml, { compact: true, spaces: 4 });


updateValues([
    'statBases.AccuracyTouch._text',
    'statBases.AccuracyShort._text',
    'statBases.AccuracyMedium._text',
    'statBases.AccuracyLong._text'
],0.10)


updateValues([
    'statBases.RangedWeapon_Cooldown._text'
], -0.15)
function updateValues (itens, percent) {
    itens.forEach(item =>{
        const initVal = parseFloat(op.get(json, item))
        const val = initVal + initVal * percent
        const rounded = Math.round((val + Number.EPSILON) * 100) / 100
        op.set(json,item, rounded)
    })
}

result = convert.json2xml(json, { compact: true, ignoreComment: false, spaces: 4 });
console.log(result)


json = convert.xml2js(xml2, { compact: true, spaces: 4 });
updateValues([
    'verbs.li.warmupTime._text'
], -0.10)
result = convert.json2xml(json, { compact: true, ignoreComment: false, spaces: 4 });
console.log(result)