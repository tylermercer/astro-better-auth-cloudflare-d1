import * as sass from 'sass';
import { generateRadixColors } from './generateRadixColors';
import { OrderedMap } from 'immutable';
import type { CustomFunction } from 'sass';

type Data = ReturnType<typeof generateRadixColors>;

function colorFunction(
    [
        appearanceJson,
        accentJson,
        grayJson,
        backgroundJson,
    ]: [
            string,
            string,
            string,
            string,
        ]
) {

    const appearance = JSON.parse(appearanceJson);
    const accent = JSON.parse(accentJson);
    const gray = JSON.parse(grayJson);
    const background = JSON.parse(backgroundJson);

    if (!(appearance === 'light' || appearance === 'dark')) {
        throw new Error('Appearance must be light or dark');
    }

    const result = {
        ...generateRadixColors({
            appearance: appearance as 'light' | 'dark',
            accent: accent,
            gray: gray,
            background: background,
        }),
        grayContrast: '#ffffffff',
    };

    const map = new Map();
    for (const key in result) {
        if (result.hasOwnProperty(key)) {
            const value = result[key as keyof Data];

            if (Array.isArray(value)) {
                const list = [];
                for (let i = 0; i < value.length; i++) {
                    list.push(new sass.SassString(value[i]));
                }
                map.set(new sass.SassString(key), new sass.SassList(list));
            } else {
                map.set(new sass.SassString(key), new sass.SassString(value));
            }
        }
    }

    return new sass.SassMap(OrderedMap(map));
}

export const generateRadixColorsSassFunctions = {
    ['generateRadixColors($appearance, $accent, $gray, $background)']: colorFunction
} as unknown as Record<string, CustomFunction<"async">>