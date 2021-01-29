const xml = `
<statBases>
			<WorkToMake>75000</WorkToMake>
			<Mass>11</Mass>
			<AccuracyTouch>0.64</AccuracyTouch>
			<AccuracyShort>0.91</AccuracyShort>
			<AccuracyMedium>1</AccuracyMedium>
			<AccuracyLong>0.87</AccuracyLong>
			<RangedWeapon_Cooldown>3.5</RangedWeapon_Cooldown>
		</statBases>
`
const xml2 =`
<verbs>
			<li>
				<verbClass>Verb_Shoot</verbClass>
				<hasStandardCommand>true</hasStandardCommand>
				<defaultProjectile>Bullet_MoyoChargeBolt</defaultProjectile>
				<forcedMissRadius>0.01</forcedMissRadius>
				<warmupTime>3</warmupTime>
				<range>50.9</range>
				<soundCast>ChargeLance_Fire</soundCast>
				<soundCastTail>GunTail_Heavy</soundCastTail>
				<muzzleFlashScale>9</muzzleFlashScale>
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