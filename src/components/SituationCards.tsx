'use client';

import { useState } from 'react';

interface SituationCardsProps {
  mbtiType: string;       // e.g., "ENFJ"
  temperamentCode: string; // e.g., "SC"
}

// ────────────────────────────────────────────
// Situation definitions
// ────────────────────────────────────────────

interface Situation {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

const situations: Situation[] = [
  { id: 'conflict', emoji: '\uD83D\uDCBC', title: '\uD68C\uC758\uC5D0\uC11C \uC758\uACAC \uCDA9\uB3CC', subtitle: '\uC9C1\uC7A5\uC5D0\uC11C \uB098\uC640 \uB2E4\uB978 \uC758\uACAC\uC744 \uB9C8\uC8FC\uCE60 \uB54C' },
  { id: 'relationship', emoji: '\u2764\uFE0F', title: '\uC5F0\uC778\uC774 \uAC11\uC790\uAE30 \uD654\uB0AC\uC744 \uB54C', subtitle: '\uC608\uC0C1\uCE58 \uBABB\uD55C \uAC10\uC815\uC801 \uC0C1\uD669\uC5D0\uC11C' },
  { id: 'burnout', emoji: '\uD83D\uDE24', title: '\uBC88\uC544\uC6C3\uC774 \uC62C \uAC83 \uAC19\uC744 \uB54C', subtitle: '\uC5D0\uB108\uC9C0\uAC00 \uBC14\uB2E5\uB0AC\uC744 \uB54C\uC758 \uB300\uCC98\uBC95' },
  { id: 'socializing', emoji: '\uD83E\uDD1D', title: '\uCC98\uC74C \uB9CC\uB09C \uC0AC\uB78C\uACFC \uB300\uD654\uD560 \uB54C', subtitle: '\uC0C8\uB85C\uC6B4 \uC0AC\uB78C\uACFC\uC758 \uCCAB \uC778\uC0C1' },
];

// ────────────────────────────────────────────
// Template-based response generation
// ────────────────────────────────────────────

type MBTILetters = {
  EI: 'E' | 'I';
  SN: 'S' | 'N';
  TF: 'T' | 'F';
  JP: 'J' | 'P';
};

type PrimaryTemperament = 'S' | 'C' | 'P' | 'M';

function parseMBTI(mbtiType: string): MBTILetters {
  return {
    EI: mbtiType.charAt(0) as 'E' | 'I',
    SN: mbtiType.charAt(1) as 'S' | 'N',
    TF: mbtiType.charAt(2) as 'T' | 'F',
    JP: mbtiType.charAt(3) as 'J' | 'P',
  };
}

// ── Natural response templates ──

const naturalConflict: Record<string, Record<string, string>> = {
  E: {
    T: '\uBC14\uB85C \uC190 \uB4E4\uACE0 \uB17C\uB9AC\uC801\uC73C\uB85C \uBC18\uBC15\uD558\uB824\uACE0 \uD574. "\uADF8\uAC74 \uC774\uB7F0 \uC774\uC720\uB85C \uC544\uB2CC\uB370\uC694" \uD558\uBA74\uC11C \uD314\uB3C4 \uC0AC\uC2E4\uACFC \uB370\uC774\uD130\uB97C \uB098\uC5F4\uD558\uBA70 \uC790\uAE30 \uC8FC\uC7A5\uC744 \uD3BC\uCE58\uB294 \uD0C0\uC785.',
    F: '\uC989\uAC01 \uBD84\uC704\uAE30\uB97C \uC77D\uACE0 "\uC800\uB3C4 \uADF8 \uC758\uACAC \uCDA9\uBD84\uD788 \uC774\uD574\uD574\uC694" \uD558\uBA74\uC11C \uC911\uC7AC\uD558\uB824\uACE0 \uD574. \uADFC\uB370 \uC18D\uC73C\uB85C\uB294 \uAC10\uC815\uC774 \uC694\uB3D9\uCE58\uACE0 \uC788\uC5B4.',
  },
  I: {
    T: '\uC77C\uB2E8 \uC870\uC6A9\uD788 \uB4E3\uACE0 \uC788\uB2E4\uAC00 \uB098\uC911\uC5D0 \uC815\uB9AC\uB41C \uB17C\uB9AC\uB85C \uBA54\uC77C\uC774\uB098 \uBA54\uBAA8\uB97C \uBCF4\uB0B4. "\uD68C\uC758 \uB54C \uB9D0\uC740 \uBABB\uD588\uB294\uB370, \uC815\uB9AC\uD574\uBD24\uC2B5\uB2C8\uB2E4" \uD558\uB294 \uC2A4\uD0C0\uC77C.',
    F: '\uACB0\uC73C\uB85C\uB294 \uC870\uC6A9\uD788 \uB4E3\uACE0 \uC788\uC9C0\uB9CC \uC18D\uC73C\uB85C\uB294 \uAC08\uB4F1 \uC0C1\uD669 \uC790\uCCB4\uAC00 \uB9C8\uC74C\uC774 \uB108\uBB34 \uD798\uB4E4\uC5B4. \uD68C\uC758 \uB05D\uB098\uACE0 \uD63C\uC790 \uACF1\uC529\uC73C\uBA70 \uC5D0\uB108\uC9C0\uAC00 \uBC29\uC804\uB3FC.',
  },
};

const naturalRelationship: Record<string, Record<string, string>> = {
  E: {
    T: '"\uBB34\uC2A8 \uC77C\uC774\uC57C? \uC774\uC720\uB97C \uB9D0\uD574\uC918" \uD558\uACE0 \uBC14\uB85C \uBB3C\uC5B4\uBD10. \uD574\uACB0\uD558\uACE0 \uC2F6\uC740 \uB9C8\uC74C\uC774 \uC55E\uC11C\uC11C \uC0C1\uB300\uAC00 \uADF8\uB0E5 \uC704\uB85C\uB97C \uC6D0\uD558\uB294 \uAC74\uC9C0 \uBAA8\uB97C \uB54C\uAC00 \uC788\uC5B4.',
    F: '\uBA3C\uC800 "\uD654\uB098\uAC8C \uD55C \uAC8C \uB098\uC600\uC5B4, \uBBF8\uC548\uD574" \uD558\uACE0 \uC0AC\uACFC\uBD80\uD130 \uD574. \uC6D0\uC778\uC774 \uB098\uC778\uC9C0 \uC544\uB2CC\uC9C0 \uBAA8\uB974\uC9C0\uB9CC \uC0C1\uB300 \uAC10\uC815\uC744 \uBA3C\uC800 \uBC1B\uC544\uC8FC\uB294 \uD0C0\uC785.',
  },
  I: {
    T: '\uC77C\uB2E8 \uC870\uC6A9\uD788 \uAD00\uCC30\uD558\uBA70 \uC0C1\uD669\uC744 \uBD84\uC11D\uD574. "\uC5B4\uB5A4 \uC810\uC774 \uBB38\uC81C\uC778\uC9C0 \uD30C\uC545\uD558\uACE0 \uB098\uC11C \uB300\uC751\uD558\uC790" \uD558\uBA70 \uB9C8\uC74C\uC18D\uC73C\uB85C \uC815\uB9AC\uD558\uB294 \uC2A4\uD0C0\uC77C.',
    F: '\uC0C1\uB300 \uAE30\uBD84\uC744 \uC2E0\uACBD \uC4F0\uBA74\uC11C\uB3C4 \uB9D0\uC744 \uC5B4\uB5BB\uAC8C \uAC74\uB124\uC57C \uD560\uC9C0 \uBAB0\uB77C \uBA38\uBB47\uAC70\uB9AC\uAC8C \uB3FC. \uC2E0\uC911\uD558\uAC8C \uAD00\uCC30\uD558\uB2E4 "\uB0B4\uAC00 \uBB50 \uC798\uBABB\uD588\uB098..." \uD558\uACE0 \uC790\uCC45\uD558\uAE30\uB3C4 \uD574.',
  },
};

const naturalBurnout: Record<string, Record<string, string>> = {
  E: {
    T: '\uBC88\uC544\uC6C3 \uC2E0\uD638\uB97C \uBB34\uC2DC\uD558\uACE0 "\uC870\uAE08\uB9CC \uB354 \uD558\uBA74 \uB3FC" \uD558\uBA70 \uB354 \uD6A8\uC728\uC801\uC778 \uBC29\uBC95\uC744 \uCC3E\uC73C\uB824 \uD574. \uD734\uC2DD\uC774 \uD544\uC694\uD55C\uB370 \uACC4\uD68D\uC744 \uC138\uC6B0\uACE0 \uC788\uB294 \uC790\uC2E0\uC744 \uBC1C\uACAC.',
    F: '\uC8FC\uBCC0 \uC0AC\uB78C\uB4E4\uC5D0\uAC8C "\uB098 \uC694\uC998 \uB108\uBB34 \uD798\uB4E4\uC5B4~" \uD558\uACE0 \uD138\uC5B4\uB193\uC544. \uADF8\uB7F0\uB370 \uC815\uC791 \uC27C\uC9C0 \uC54A\uACE0 \uC0AC\uB78C\uB4E4 \uB9CC\uB098\uBA70 \uAE30\uBD84 \uC804\uD658\uD558\uB824\uACE0 \uD574.',
  },
  I: {
    T: '\uD63C\uC790 \uC870\uC6A9\uD788 \uBC88\uC544\uC6C3 \uC6D0\uC778\uC744 \uBD84\uC11D\uD558\uACE0 \uD574\uACB0\uCC45\uC744 \uCC3E\uC73C\uB824 \uD574. \uADF8\uB7F0\uB370 \uBB38\uC81C\uB294 "\uBD84\uC11D\uD558\uB294 \uAC83 \uC790\uCCB4"\uAC00 \uB610 \uD558\uB098\uC758 \uC5D0\uB108\uC9C0 \uC18C\uBAA8\uB77C\uB294 \uAC83.',
    F: '\uC870\uC6A9\uD788 \uC790\uAE30 \uC548\uC73C\uB85C \uC6C5\uCFDC\uB9AC\uBA70 \uC138\uC0C1\uACFC \uB2E8\uC808\uD558\uACE0 \uC2F6\uC5B4\uC838. \uB0A8\uB4E4 \uBCF4\uAE30\uC5D4 \uBA40\uC929\uD574 \uBCF4\uC774\uC9C0\uB9CC \uC18D\uC73C\uB85C\uB294 \uAC10\uC815\uC774 \uD3ED\uD48D\uCC98\uB7FC \uD718\uBAB0\uC544\uCE58\uACE0 \uC788\uC5B4.',
  },
};

const naturalSocializing: Record<string, Record<string, string>> = {
  E: {
    T: '\uBA3C\uC800 \uB9D0\uC744 \uAC78\uACE0 \uC0C1\uB300\uC758 \uBC30\uACBD\uC774\uB098 \uAD00\uC2EC\uC0AC\uB97C \uD30C\uC545\uD558\uB824 \uD574. \uB300\uD654\uB97C \uC774\uB04C\uBA70 \uD765\uBBF8\uB85C\uC6B4 \uD1A0\uB860\uC73C\uB85C \uBC1C\uC804\uC2DC\uD0A4\uB294 \uAC78 \uC88B\uC544\uD574.',
    F: '\uC0C1\uB300\uC5D0\uAC8C \uC9C4\uC2EC \uC5B4\uB9B0 \uAD00\uC2EC\uC744 \uBCF4\uC774\uBA70 "\uC640 \uC9C4\uC9DC\uC694?" \uD558\uACE0 \uACF5\uAC10\uD574\uC918. \uAE08\uBC29 \uCE5C\uD574\uC838\uC11C \uCC98\uC74C \uB9CC\uB09C \uAC83 \uAC19\uC9C0 \uC54A\uC740 \uBD84\uC704\uAE30\uB97C \uB9CC\uB4E4\uC5B4.',
  },
  I: {
    T: '\uC870\uC6A9\uD788 \uAD00\uCC30\uD558\uB2E4\uAC00 \uACF5\uD1B5 \uAD00\uC2EC\uC0AC\uAC00 \uC0DD\uAE30\uBA74 \uADF8\uB54C \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uB9D0\uC744 \uAC78\uC5B4. \uC2A4\uBAB0\uD1A1\uC740 \uC798 \uBABB\uD558\uC9C0\uB9CC \uAE4A\uC774 \uC788\uB294 \uB300\uD654\uB294 \uC798 \uD574.',
    F: '\uC18D\uC73C\uB85C\uB294 \uB9D0\uAC78\uACE0 \uC2F6\uC740\uB370 \uBA3C\uC800 \uB2E4\uAC00\uAC00\uAE30 \uC5B4\uB824\uC6CC. \uC0C1\uB300\uAC00 \uBA3C\uC800 \uB9D0\uAC78\uC5B4\uC8FC\uBA74 \uADF8\uB54C\uBD80\uD130 \uD3B8\uD558\uAC8C \uB300\uD654\uD560 \uC218 \uC788\uB294 \uD0C0\uC785.',
  },
};

// ── Temperament flavor modifiers ──

interface TemperamentFlavor {
  conflict: string;
  relationship: string;
  burnout: string;
  socializing: string;
}

const temperamentNaturalFlavors: Record<PrimaryTemperament, TemperamentFlavor> = {
  S: {
    conflict: ' \uADF8\uB9AC\uACE0 \uAE08\uBC29 \uBD84\uC704\uAE30 \uBC14\uAFD4\uC11C \uC6C3\uAE34 \uC5D0\uD53C\uC18C\uB4DC\uB85C \uB9CC\uB4E4\uB824\uACE0 \uD574.',
    relationship: ' \uC5B4\uC0C9\uD55C \uBD84\uC704\uAE30\uB97C \uBABB \uCC38\uACE0 \uC7AC\uBE60\uB978 \uB180\uB2F4\uC73C\uB85C \uBB34\uB9C8\uD558\uB824\uACE0 \uD574.',
    burnout: ' \uBC88\uC544\uC6C3\uC774\uC5B4\uB3C4 \uAE08\uBC29 \uC0C8\uB85C\uC6B4 \uAC83\uC5D0 \uB04C\uB824\uC11C \uD55C\uB208\uD314\uAE30 \uC27D\uACE0.',
    socializing: ' \uD0C0\uACE0\uB09C \uC0AC\uAD50\uC131\uC73C\uB85C \uC0C8\uB85C\uC6B4 \uC0AC\uB78C\uACFC\uB3C4 \uAE08\uBC29 \uCE5C\uD574\uC838.',
  },
  C: {
    conflict: ' \uC790\uAE30 \uC758\uACAC\uC774 \uB9DE\uB2E4\uB294 \uD655\uC2E0\uC774 \uAC15\uD574\uC11C \uBB3C\uB7EC\uC11C\uC9C0 \uC54A\uB294 \uD3B8.',
    relationship: ' \uC0C1\uD669\uC744 \uCEE8\uD2B8\uB864\uD558\uB824\uB294 \uC131\uD5A5\uC774 \uB098\uC640\uC11C "\uD654\uB0BC \uC774\uC720\uAC00 \uC5C6\uC796\uC544" \uD560 \uC218\uB3C4.',
    burnout: ' \uBC88\uC544\uC6C3\uC744 \uC57D\uD568\uC73C\uB85C \uBCF4\uACE0 \uB354 \uAC15\uD558\uAC8C \uBC00\uC5B4\uBD99\uC774\uB824 \uD574.',
    socializing: ' \uB300\uD654\uC758 \uC8FC\uB3C4\uAD8C\uC744 \uC7A1\uACE0 \uB9AC\uB4DC\uD558\uB294 \uC704\uCE58\uB97C \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uCC28\uC9C0\uD574.',
  },
  P: {
    conflict: ' \uAC08\uB4F1\uC774 \uBD88\uD3B8\uD574\uC11C \uC801\uB2F9\uD788 \uB9DE\uCDB0\uC8FC\uBA70 \uD569\uC758\uC810\uC744 \uCC3E\uC73C\uB824\uACE0 \uD574.',
    relationship: ' \uCC28\uBD84\uD788 \uAE30\uB2E4\uB9AC\uBA70 \uD3C9\uC18C\uCC98\uB7FC \uD3B8\uC548\uD558\uAC8C \uC788\uC5B4\uC918.',
    burnout: ' \uD070 \uD2F0\uB97C \uB0B4\uC9C0 \uC54A\uACE0 \uC870\uC6A9\uD788 \uC790\uAE30 \uD398\uC774\uC2A4\uB85C \uD68C\uBCF5\uD574.',
    socializing: ' \uBD80\uB2F4 \uC5C6\uC774 \uB4E4\uC5B4\uC8FC\uB294 \uD3B8\uC548\uD55C \uC0AC\uB78C\uC73C\uB85C \uC778\uC2DD\uB3FC.',
  },
  M: {
    conflict: ' \uC758\uACAC \uCDA9\uB3CC \uC0C1\uD669\uC744 \uAE4A\uC774 \uBD84\uC11D\uD558\uBA70 \uC644\uBCBD\uD55C \uB2F5\uC744 \uCC3E\uC73C\uB824 \uD574.',
    relationship: ' \uC0C1\uB300\uC758 \uD589\uB3D9\uC744 \uAE4A\uC774 \uBD84\uC11D\uD558\uBA70 \uB0B4 \uC798\uBABB\uC744 \uACF1\uC529\uC5B4.',
    burnout: ' \uC5D0\uB108\uC9C0\uAC00 \uBC14\uB2E5\uB098\uBA74 \uC644\uBCBD\uC8FC\uC758\uAC00 \uB354 \uC2EC\uD574\uC838\uC11C \uC545\uC21C\uD658\uC774 \uB3FC.',
    socializing: ' \uAD00\uCC30\uB825\uC774 \uB6F0\uC5B4\uB098\uC11C \uC0C1\uB300\uB97C \uBE60\uB974\uAC8C \uD30C\uC545\uD558\uB294 \uD3B8.',
  },
};

// ── Growth response templates ──

const growthConflict: Record<string, Record<string, string>> = {
  E: {
    T: '\uBC18\uBC15\uD558\uAE30 \uC804\uC5D0 "\uD765\uBBF8\uB85C\uC6B4 \uAD00\uC810\uC774\uB124\uC694, \uC880 \uB354 \uB4E4\uB824\uC8FC\uC138\uC694" \uD558\uACE0 \uB4E3\uB294 \uC2DC\uAC04\uC744 \uAC16\uC790. \uC0C1\uB300\uC758 \uB17C\uB9AC\uC5D0\uC11C \uBC30\uC6B8 \uC810\uC774 \uBD84\uBA85 \uC788\uC5B4.',
    F: '\uC911\uC7AC\uD558\uB824\uB294 \uB9C8\uC74C\uC744 \uC7A0\uC2DC \uB0B4\uB824\uB193\uACE0, \uB0B4 \uC758\uACAC\uB3C4 \uBD84\uBA85\uD558\uAC8C \uC804\uB2EC\uD574\uBD10. "\uB098\uB294 \uC774\uB807\uAC8C \uC0DD\uAC01\uD558\uB294\uB370\uC694" \uD558\uACE0 \uB2F9\uB2F9\uD558\uAC8C.',
  },
  I: {
    T: '\uBA54\uC77C \uB300\uC2E0 \uD68C\uC758 \uC790\uB9AC\uC5D0\uC11C \uD55C\uB9C8\uB514\uB77C\uB3C4 \uD574\uBCF4\uC790. "\uC81C\uAC00 \uBCF4\uAE30\uC5D4..." \uD558\uACE0 \uC9E7\uAC8C\uB77C\uB3C4 \uC758\uACAC\uC744 \uB9D0\uD558\uBA74 \uC874\uC7AC\uAC10\uC774 \uB2EC\uB77C\uC838.',
    F: '\uACF5\uC774\uB294 \uC5D0\uB108\uC9C0\uB97C \uC790\uAE30\uB97C \uC704\uD574 \uC368\uBCF4\uC790. \uD68C\uC758 \uD6C4\uC5D0 "\uC624\uB298 \uD798\uB4E4\uC5C8\uB2E4" \uD558\uACE0 \uAC10\uC815\uC744 \uC778\uC815\uD558\uB294 \uAC83\uB9CC\uC73C\uB85C\uB3C4 \uD68C\uBCF5\uC774 \uBE68\uB77C\uC838.',
  },
};

const growthRelationship: Record<string, Record<string, string>> = {
  E: {
    T: '\uD574\uACB0\uCC45\uC744 \uC81C\uC2DC\uD558\uAE30 \uC804\uC5D0 "\uC9C0\uAE08 \uAE30\uBD84\uC774 \uC5B4\uB54C?" \uD558\uACE0 \uAC10\uC815\uBD80\uD130 \uBB3C\uC5B4\uBCF4\uC790. \uD574\uACB0\uC740 \uC0C1\uB300\uAC00 \uC900\uBE44\uB410\uC744 \uB54C \uD558\uBA74 \uB3FC.',
    F: '\uC0AC\uACFC\uD558\uAE30 \uC804\uC5D0 "\uBB34\uC5C7 \uB54C\uBB38\uC5D0 \uD654\uAC00 \uB09C \uAC74\uC9C0 \uB4E3\uACE0 \uC2F6\uC5B4" \uD558\uACE0 \uC0C1\uB300 \uC774\uC57C\uAE30\uB97C \uBA3C\uC800 \uB4E4\uC5B4\uBD10. \uBB34\uC870\uAC74 \uC0AC\uACFC\uBCF4\uB2E4 \uACBD\uCCAD\uC774 \uD544\uC694\uD560 \uB54C\uAC00 \uC788\uC5B4.',
  },
  I: {
    T: '\uBD84\uC11D\uB9CC \uD558\uC9C0 \uB9D0\uACE0 \uC18D\uB9C8\uC74C\uC744 \uD45C\uD604\uD574\uBD10. "\uB124\uAC00 \uD654\uB0B4\uB2C8\uAE4C \uB098\uB3C4 \uB9C8\uC74C\uC774 \uC544\uD504\uB2E4" \uD55C\uB9C8\uB514\uAC00 \uBC31\uB9C8\uB514 \uBD84\uC11D\uBCF4\uB2E4 \uB098\uC544.',
    F: '\uC790\uCC45\uD558\uAE30 \uC804\uC5D0 "\uD63C\uC790 \uC0DD\uAC01 \uC815\uB9AC\uD560 \uC2DC\uAC04\uC774 \uD544\uC694\uD574" \uD558\uACE0 \uC790\uAE30 \uAC10\uC815\uBD80\uD130 \uB3CC\uBD10\uC8FC\uC790. \uB0B4 \uAC10\uC815\uB3C4 \uC18C\uC911\uD574.',
  },
};

const growthBurnout: Record<string, Record<string, string>> = {
  E: {
    T: '\uD6A8\uC728\uBCF4\uB2E4 "\uC624\uB298\uC740 \uADF8\uB0E5 \uC27C\uB2E4" \uB97C \uC120\uD0DD\uD574\uBD10. \uACC4\uD68D \uC5C6\uC774 \uBE48\uB465\uAC70\uB9AC\uB294 \uAC83\uB3C4 \uD6CC\uB96D\uD55C \uD68C\uBCF5 \uC804\uB7B5\uC774\uC57C.',
    F: '\uC0AC\uB78C\uB4E4 \uB9CC\uB098\uB294 \uB300\uC2E0 \uD558\uB8E8\uB9CC\uC774\uB77C\uB3C4 \uD63C\uC790\uB9CC\uC758 \uC2DC\uAC04\uC744 \uAC00\uC838\uBD10. \uC870\uC6A9\uD55C \uACF3\uC5D0\uC11C \uC790\uAE30 \uAC10\uC815\uACFC \uB300\uD654\uD558\uB294 \uAC8C \uC9C4\uC9DC \uCDA9\uC804.',
  },
  I: {
    T: '\uBD84\uC11D\uC744 \uBA48\uCE58\uACE0 \uBAB8\uC774 \uBCF4\uB0B4\uB294 \uC2E0\uD638\uC5D0 \uC9D1\uC911\uD574\uBD10. \uC0B0\uCC45, \uC2A4\uD2B8\uB808\uCE6D, \uB530\uB73B\uD55C \uCC28 \uD55C\uC794 \uAC19\uC740 \uAC10\uAC01\uC801\uC778 \uD68C\uBCF5\uC774 \uD544\uC694\uD55C \uC2DC\uAE30.',
    F: '\uD63C\uC790\uB9CC\uC758 \uC138\uACC4\uC5D0\uB9CC \uC788\uC9C0 \uB9D0\uACE0, \uC2E0\uB8B0\uD558\uB294 \uD55C \uC0AC\uB78C\uC5D0\uAC8C "\uB098 \uC694\uC998 \uD798\uB4E4\uC5B4" \uD558\uACE0 \uB9D0\uD574\uBD10. \uADF8 \uD55C\uB9C8\uB514\uAC00 \uAC10\uC815\uC758 \uBC38\uBE0C\uB97C \uC5F4\uC5B4\uC918.',
  },
};

const growthSocializing: Record<string, Record<string, string>> = {
  E: {
    T: '\uD1A0\uB860\uBCF4\uB2E4\uB294 \uC0C1\uB300\uC758 \uC774\uC57C\uAE30\uC5D0 \uC9C4\uC2EC\uC73C\uB85C \uADC0 \uAE30\uC6B8\uC5EC\uBD10. "\uADF8\uB7F0 \uACBD\uD5D8\uC774 \uC5B4\uB560\uB294\uC9C0" \uBB3C\uC73C\uBA74 \uB354 \uAE4A\uC740 \uAD00\uACC4\uAC00 \uC2DC\uC791\uB3FC.',
    F: '\uCE5C\uD574\uC9C0\uB294 \uAC83\uB3C4 \uC88B\uC9C0\uB9CC \uAC00\uB054\uC740 \uCE68\uBBC5\uB3C4 \uD5C8\uC6A9\uD574\uBD10. \uBAA8\uB4E0 \uBE48 \uD2C8\uC744 \uCC44\uC6B0\uB824 \uD558\uC9C0 \uC54A\uC544\uB3C4 \uB300\uD654\uB294 \uD750\uB97C \uC218 \uC788\uC5B4.',
  },
  I: {
    T: '\uC644\uBCBD\uD55C \uB300\uD654 \uC8FC\uC81C\uB97C \uCC3E\uC9C0 \uB9D0\uACE0 \uAC00\uBCBC\uC6B4 \uC9C8\uBB38\uC73C\uB85C \uC2DC\uC791\uD574\uBD10. "\uC694\uC998 \uBB50\uC5D0 \uBE60\uC838\uC788\uC5B4\uC694?" \uD558\uB098\uBA74 \uCDA9\uBD84\uD574.',
    F: '\uC0C1\uB300\uAC00 \uB9D0\uAC78\uC5B4\uC904 \uB54C\uAE4C\uC9C0 \uAE30\uB2E4\uB9AC\uC9C0 \uB9D0\uACE0, \uC791\uC740 \uBBF8\uC18C\uC640 \uB208\uC778\uC0AC\uBD80\uD130 \uC2DC\uC791\uD574\uBD10. \uADF8\uAC8C \uB2F9\uC2E0\uC758 \uC5B4\uC0C9\uD568\uC744 \uB179\uC774\uB294 \uCCA8\uBC88\uC9F8 \uB2E8\uACC4\uC57C.',
  },
};

// ── Growth temperament flavor ──

const temperamentGrowthFlavors: Record<PrimaryTemperament, TemperamentFlavor> = {
  S: {
    conflict: ' \uD765\uBBF8\uB85C \uBB34\uB9C8\uD558\uB824 \uD558\uC9C0 \uB9D0\uACE0, \uBD88\uD3B8\uD55C \uAC10\uC815\uB3C4 \uADF8\uB0E5 \uB290\uAEF4\uBD10.',
    relationship: ' \uC7AC\uBE60\uB978 \uBC18\uC751 \uB300\uC2E0 \uC0C1\uB300\uC758 \uAC10\uC815\uC5D0 \uC9D1\uC911\uD558\uB294 \uC5F0\uC2B5\uC744.',
    burnout: ' \uC0C8\uB85C\uC6B4 \uAC83\uC73C\uB85C \uB3C4\uD53C\uD558\uC9C0 \uB9D0\uACE0 \uC9C0\uAE08 \uC0C1\uD0DC\uC5D0 \uBA38\uBB3C\uB7EC\uBD10.',
    socializing: ' \uC591\uBCF4\uB2E4 \uC9C8\uB85C \uC2B9\uBD80\uD574\uBD10. \uD55C \uC0AC\uB78C\uACFC \uAE4A\uAC8C \uC5F0\uACB0\uB418\uB294 \uACBD\uD5D8\uC744.',
  },
  C: {
    conflict: ' \uCEE8\uD2B8\uB864 \uC695\uAD6C\uB97C \uB0B4\uB824\uB193\uACE0 \uC0C1\uB300\uC758 \uD398\uC774\uC2A4\uC5D0 \uB9DE\uCDB0\uBCF4\uB294 \uAC83\uB3C4 \uB9AC\uB354\uC2ED.',
    relationship: ' \uD1B5\uC81C\uD558\uB824 \uD558\uC9C0 \uB9D0\uACE0 \uCDE8\uC57D\uD568\uC744 \uBCF4\uC5EC\uC918\uBD10. \uADF8\uAC8C \uC9C4\uC9DC \uC6A9\uAE30.',
    burnout: ' \uB3C4\uC6C0\uC744 \uC694\uCCAD\uD558\uB294 \uAC83\uC740 \uC57D\uD568\uC774 \uC544\uB2C8\uC57C. \uC704\uC784\uD558\uB294 \uAC83\uB3C4 \uB2A5\uB825\uC774\uB2C8\uAE4C.',
    socializing: ' \uB9AC\uB4DC\uD558\uB824 \uD558\uC9C0 \uB9D0\uACE0 \uB530\uB77C\uAC00\uBCF4\uB294 \uACBD\uD5D8\uB3C4 \uD574\uBD10.',
  },
  P: {
    conflict: ' \uD3B8\uD55C \uAC83\uB9CC \uCD94\uAD6C\uD558\uC9C0 \uB9D0\uACE0, \uD55C \uBC88\uC774\uB77C\uB3C4 \uBD88\uD3B8\uD55C \uC758\uACAC\uC744 \uB0B4\uBD10.',
    relationship: ' "\uAD1C\uCC2E\uC544" \uB300\uC2E0 \uC9C4\uC9DC \uAC10\uC815\uC744 \uC804\uB2EC\uD574\uBD10. \uAC08\uB4F1\uC744 \uD53C\uD558\uC9C0 \uC54A\uB294 \uAC8C \uACB0\uAD6D \uB354 \uAC74\uAC15\uD574.',
    burnout: ' \uC790\uAE30 \uD398\uC774\uC2A4\uB97C \uC9C0\uD0A4\uB418, \uD68C\uBCF5\uC758 \uBAA9\uD45C\uB97C \uC138\uC6CC\uBD10.',
    socializing: ' \uD3B8\uC548\uD55C \uCCAD\uCDE8\uC790\uC5D0\uC11C \uD55C \uBC1C\uC9DD \uB098\uC640 \uBA3C\uC800 \uC9C8\uBB38\uD574\uBD10.',
  },
  M: {
    conflict: ' \uC644\uBCBD\uD55C \uB2F5\uC744 \uCC3E\uC73C\uB824 \uD558\uC9C0 \uB9D0\uACE0, 80\uC810\uC9DC\uB9AC \uC758\uACAC\uB3C4 \uCDA9\uBD84\uD574.',
    relationship: ' \uACF5\uC529\uC744 \uBA48\uCE58\uACE0 "\uADF8\uB0E5 \uC548\uC544\uC918" \uD558\uACE0 \uD589\uB3D9\uC73C\uB85C \uC0AC\uB791\uC744 \uD45C\uD604\uD574\uBD10.',
    burnout: ' \uBD88\uC644\uC804\uD55C \uC0C1\uD0DC\uC5D0\uC11C\uB3C4 \uC27C \uC218 \uC788\uB294 \uC790\uACA9\uC774 \uC788\uC5B4. \uC790\uAE30 \uC5F0\uBBFC\uC744 \uC5F0\uC2B5\uD574\uBD10.',
    socializing: ' \uBD84\uC11D\uD558\uC9C0 \uB9D0\uACE0 \uADF8 \uC21C\uAC04\uC744 \uC990\uACA8\uBD10. \uBAA8\uB4E0 \uB9CC\uB0A8\uC774 \uC758\uBBF8 \uC788\uC744 \uD544\uC694\uB294 \uC5C6\uC5B4.',
  },
};

// ── Response generator ──

function generateResponse(
  situationId: string,
  tab: 'natural' | 'growth',
  mbtiLetters: MBTILetters,
  primaryTemp: PrimaryTemperament
): string {
  const ei = mbtiLetters.EI;
  const tf = mbtiLetters.TF;

  let base: string;
  let flavor: string;

  if (tab === 'natural') {
    const templates: Record<string, Record<string, Record<string, string>>> = {
      conflict: naturalConflict,
      relationship: naturalRelationship,
      burnout: naturalBurnout,
      socializing: naturalSocializing,
    };
    const flavors = temperamentNaturalFlavors[primaryTemp];
    base = templates[situationId]?.[ei]?.[tf] ?? '';
    flavor = flavors[situationId as keyof TemperamentFlavor] ?? '';
  } else {
    const templates: Record<string, Record<string, Record<string, string>>> = {
      conflict: growthConflict,
      relationship: growthRelationship,
      burnout: growthBurnout,
      socializing: growthSocializing,
    };
    const flavors = temperamentGrowthFlavors[primaryTemp];
    base = templates[situationId]?.[ei]?.[tf] ?? '';
    flavor = flavors[situationId as keyof TemperamentFlavor] ?? '';
  }

  return base + flavor;
}

// ────────────────────────────────────────────
// SituationCards Component
// ────────────────────────────────────────────

export default function SituationCards({ mbtiType, temperamentCode }: SituationCardsProps) {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'natural' | 'growth'>('natural');

  const mbtiLetters = parseMBTI(mbtiType);
  const primaryTemp = temperamentCode.charAt(0) as PrimaryTemperament;

  const handleToggle = (id: string) => {
    if (openCard === id) {
      setOpenCard(null);
    } else {
      setOpenCard(id);
      setActiveTab('natural');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
        <span className="text-2xl">🎭</span>
        상황별 반응 카드
      </h3>
      <p className="text-sm text-gray-500 mb-5">
        {mbtiType}-{temperamentCode} 유형이 각 상황에서 보이는 자연스러운 반응과 성장 포인트
      </p>

      <div className="space-y-3">
        {situations.map((situation) => {
          const isOpen = openCard === situation.id;
          const naturalText = generateResponse(situation.id, 'natural', mbtiLetters, primaryTemp);
          const growthText = generateResponse(situation.id, 'growth', mbtiLetters, primaryTemp);

          return (
            <div
              key={situation.id}
              className={`rounded-xl border transition-all duration-300 ${
                isOpen
                  ? 'border-indigo-200 bg-gradient-to-b from-indigo-50/50 to-white shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              {/* Card Header */}
              <button
                onClick={() => handleToggle(situation.id)}
                className="w-full flex items-center justify-between p-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`situation-${situation.id}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{situation.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{situation.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{situation.subtitle}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expandable Content */}
              <div
                id={`situation-${situation.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setActiveTab('natural')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'natural'
                          ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      🔍 자연스러운 반응
                    </button>
                    <button
                      onClick={() => setActiveTab('growth')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'growth'
                          ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      🌱 성장 반응
                    </button>
                  </div>

                  {/* Response Content */}
                  <div
                    className={`rounded-lg p-4 transition-all duration-200 ${
                      activeTab === 'natural'
                        ? 'bg-indigo-50/70 border border-indigo-100'
                        : 'bg-emerald-50/70 border border-emerald-100'
                    }`}
                  >
                    <p className="text-[15px] text-gray-700 leading-[1.85]">
                      {activeTab === 'natural' ? naturalText : growthText}
                    </p>
                  </div>

                  {/* Subtle hint */}
                  {activeTab === 'natural' && (
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      🌱 탭을 눌러 성장 반응도 확인해보세요
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
