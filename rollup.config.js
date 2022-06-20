import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import dts from 'rollup-plugin-dts'
import del from 'rollup-plugin-delete'
import babel from '@rollup/plugin-babel'

export default [
    //gera versões do código commonJs e esmodule
    //e limpa os comentários tsdoc
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/commonjs/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/esmodule/index.js',
                format: 'es',
            },
        ],
        plugins: [
            cleanup({ comments: 'istanbul', extensions: ['js'] }),
            babel({
                babelHelpers: 'runtime',
                babelrc: true,
            }),
        ],
    },
    //extrai os comentários tsdoc do código
    //e gera os arquivos d.ts
    {
        input: 'src/index.js',
        output: { dir: 'types', format: 'cjs' },
        plugins: [
            typescript({
                include: ['/src/**/*'],
                exclude: ['/dist'],

                tsconfigDefaults: {
                    compilerOptions: {
                        target: 'es5',
                        allowJs: true,
                        declaration: true,
                        emitDeclarationOnly: true,
                    },
                },
            }),
        ],
    },
    /* 
        unifica os arquivos .d.ts gerados 
        em um unico arquivo de entrada index.d.ts
        Obs: Não apagar o arquivo types.d.ts da raiz, 
        pois ele aponta para os arquivos necessários que serão unificados  
    */
    {
        input: './types.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    },
    //deleta a pasta criada quando os comentários tsdoc foram extraídos
    {
        input: 'src/index.js',
        plugins: [del({ targets: 'types' })],
    },
]
