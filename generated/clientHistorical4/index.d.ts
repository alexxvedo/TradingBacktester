
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model HistoricalData1Sec
 * 
 */
export type HistoricalData1Sec = $Result.DefaultSelection<Prisma.$HistoricalData1SecPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more HistoricalData1Secs
 * const historicalData1Secs = await prisma.historicalData1Sec.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more HistoricalData1Secs
   * const historicalData1Secs = await prisma.historicalData1Sec.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.historicalData1Sec`: Exposes CRUD operations for the **HistoricalData1Sec** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HistoricalData1Secs
    * const historicalData1Secs = await prisma.historicalData1Sec.findMany()
    * ```
    */
  get historicalData1Sec(): Prisma.HistoricalData1SecDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.16.1
   * Query Engine version: 34ace0eb2704183d2c05b60b52fba5c43c13f303
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    HistoricalData1Sec: 'HistoricalData1Sec'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "historicalData1Sec"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      HistoricalData1Sec: {
        payload: Prisma.$HistoricalData1SecPayload<ExtArgs>
        fields: Prisma.HistoricalData1SecFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HistoricalData1SecFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HistoricalData1SecFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload>
          }
          findFirst: {
            args: Prisma.HistoricalData1SecFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HistoricalData1SecFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload>
          }
          findMany: {
            args: Prisma.HistoricalData1SecFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload>[]
          }
          create: {
            args: Prisma.HistoricalData1SecCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload>
          }
          createMany: {
            args: Prisma.HistoricalData1SecCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HistoricalData1SecDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload>
          }
          update: {
            args: Prisma.HistoricalData1SecUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload>
          }
          deleteMany: {
            args: Prisma.HistoricalData1SecDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HistoricalData1SecUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HistoricalData1SecUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricalData1SecPayload>
          }
          aggregate: {
            args: Prisma.HistoricalData1SecAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistoricalData1Sec>
          }
          groupBy: {
            args: Prisma.HistoricalData1SecGroupByArgs<ExtArgs>
            result: $Utils.Optional<HistoricalData1SecGroupByOutputType>[]
          }
          count: {
            args: Prisma.HistoricalData1SecCountArgs<ExtArgs>
            result: $Utils.Optional<HistoricalData1SecCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model HistoricalData1Sec
   */

  export type AggregateHistoricalData1Sec = {
    _count: HistoricalData1SecCountAggregateOutputType | null
    _avg: HistoricalData1SecAvgAggregateOutputType | null
    _sum: HistoricalData1SecSumAggregateOutputType | null
    _min: HistoricalData1SecMinAggregateOutputType | null
    _max: HistoricalData1SecMaxAggregateOutputType | null
  }

  export type HistoricalData1SecAvgAggregateOutputType = {
    open: number | null
    high: number | null
    low: number | null
    close: number | null
  }

  export type HistoricalData1SecSumAggregateOutputType = {
    open: number | null
    high: number | null
    low: number | null
    close: number | null
  }

  export type HistoricalData1SecMinAggregateOutputType = {
    timestamp: Date | null
    currency: string | null
    open: number | null
    high: number | null
    low: number | null
    close: number | null
  }

  export type HistoricalData1SecMaxAggregateOutputType = {
    timestamp: Date | null
    currency: string | null
    open: number | null
    high: number | null
    low: number | null
    close: number | null
  }

  export type HistoricalData1SecCountAggregateOutputType = {
    timestamp: number
    currency: number
    open: number
    high: number
    low: number
    close: number
    _all: number
  }


  export type HistoricalData1SecAvgAggregateInputType = {
    open?: true
    high?: true
    low?: true
    close?: true
  }

  export type HistoricalData1SecSumAggregateInputType = {
    open?: true
    high?: true
    low?: true
    close?: true
  }

  export type HistoricalData1SecMinAggregateInputType = {
    timestamp?: true
    currency?: true
    open?: true
    high?: true
    low?: true
    close?: true
  }

  export type HistoricalData1SecMaxAggregateInputType = {
    timestamp?: true
    currency?: true
    open?: true
    high?: true
    low?: true
    close?: true
  }

  export type HistoricalData1SecCountAggregateInputType = {
    timestamp?: true
    currency?: true
    open?: true
    high?: true
    low?: true
    close?: true
    _all?: true
  }

  export type HistoricalData1SecAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoricalData1Sec to aggregate.
     */
    where?: HistoricalData1SecWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricalData1Secs to fetch.
     */
    orderBy?: HistoricalData1SecOrderByWithRelationInput | HistoricalData1SecOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HistoricalData1SecWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricalData1Secs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricalData1Secs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HistoricalData1Secs
    **/
    _count?: true | HistoricalData1SecCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HistoricalData1SecAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HistoricalData1SecSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HistoricalData1SecMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HistoricalData1SecMaxAggregateInputType
  }

  export type GetHistoricalData1SecAggregateType<T extends HistoricalData1SecAggregateArgs> = {
        [P in keyof T & keyof AggregateHistoricalData1Sec]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistoricalData1Sec[P]>
      : GetScalarType<T[P], AggregateHistoricalData1Sec[P]>
  }




  export type HistoricalData1SecGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoricalData1SecWhereInput
    orderBy?: HistoricalData1SecOrderByWithAggregationInput | HistoricalData1SecOrderByWithAggregationInput[]
    by: HistoricalData1SecScalarFieldEnum[] | HistoricalData1SecScalarFieldEnum
    having?: HistoricalData1SecScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HistoricalData1SecCountAggregateInputType | true
    _avg?: HistoricalData1SecAvgAggregateInputType
    _sum?: HistoricalData1SecSumAggregateInputType
    _min?: HistoricalData1SecMinAggregateInputType
    _max?: HistoricalData1SecMaxAggregateInputType
  }

  export type HistoricalData1SecGroupByOutputType = {
    timestamp: Date
    currency: string
    open: number
    high: number
    low: number
    close: number
    _count: HistoricalData1SecCountAggregateOutputType | null
    _avg: HistoricalData1SecAvgAggregateOutputType | null
    _sum: HistoricalData1SecSumAggregateOutputType | null
    _min: HistoricalData1SecMinAggregateOutputType | null
    _max: HistoricalData1SecMaxAggregateOutputType | null
  }

  type GetHistoricalData1SecGroupByPayload<T extends HistoricalData1SecGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HistoricalData1SecGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HistoricalData1SecGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HistoricalData1SecGroupByOutputType[P]>
            : GetScalarType<T[P], HistoricalData1SecGroupByOutputType[P]>
        }
      >
    >


  export type HistoricalData1SecSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    timestamp?: boolean
    currency?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
  }, ExtArgs["result"]["historicalData1Sec"]>


  export type HistoricalData1SecSelectScalar = {
    timestamp?: boolean
    currency?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
  }


  export type $HistoricalData1SecPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HistoricalData1Sec"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      timestamp: Date
      currency: string
      open: number
      high: number
      low: number
      close: number
    }, ExtArgs["result"]["historicalData1Sec"]>
    composites: {}
  }

  type HistoricalData1SecGetPayload<S extends boolean | null | undefined | HistoricalData1SecDefaultArgs> = $Result.GetResult<Prisma.$HistoricalData1SecPayload, S>

  type HistoricalData1SecCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HistoricalData1SecFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HistoricalData1SecCountAggregateInputType | true
    }

  export interface HistoricalData1SecDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HistoricalData1Sec'], meta: { name: 'HistoricalData1Sec' } }
    /**
     * Find zero or one HistoricalData1Sec that matches the filter.
     * @param {HistoricalData1SecFindUniqueArgs} args - Arguments to find a HistoricalData1Sec
     * @example
     * // Get one HistoricalData1Sec
     * const historicalData1Sec = await prisma.historicalData1Sec.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HistoricalData1SecFindUniqueArgs>(args: SelectSubset<T, HistoricalData1SecFindUniqueArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HistoricalData1Sec that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HistoricalData1SecFindUniqueOrThrowArgs} args - Arguments to find a HistoricalData1Sec
     * @example
     * // Get one HistoricalData1Sec
     * const historicalData1Sec = await prisma.historicalData1Sec.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HistoricalData1SecFindUniqueOrThrowArgs>(args: SelectSubset<T, HistoricalData1SecFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HistoricalData1Sec that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricalData1SecFindFirstArgs} args - Arguments to find a HistoricalData1Sec
     * @example
     * // Get one HistoricalData1Sec
     * const historicalData1Sec = await prisma.historicalData1Sec.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HistoricalData1SecFindFirstArgs>(args?: SelectSubset<T, HistoricalData1SecFindFirstArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HistoricalData1Sec that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricalData1SecFindFirstOrThrowArgs} args - Arguments to find a HistoricalData1Sec
     * @example
     * // Get one HistoricalData1Sec
     * const historicalData1Sec = await prisma.historicalData1Sec.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HistoricalData1SecFindFirstOrThrowArgs>(args?: SelectSubset<T, HistoricalData1SecFindFirstOrThrowArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HistoricalData1Secs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricalData1SecFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HistoricalData1Secs
     * const historicalData1Secs = await prisma.historicalData1Sec.findMany()
     * 
     * // Get first 10 HistoricalData1Secs
     * const historicalData1Secs = await prisma.historicalData1Sec.findMany({ take: 10 })
     * 
     * // Only select the `timestamp`
     * const historicalData1SecWithTimestampOnly = await prisma.historicalData1Sec.findMany({ select: { timestamp: true } })
     * 
     */
    findMany<T extends HistoricalData1SecFindManyArgs>(args?: SelectSubset<T, HistoricalData1SecFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HistoricalData1Sec.
     * @param {HistoricalData1SecCreateArgs} args - Arguments to create a HistoricalData1Sec.
     * @example
     * // Create one HistoricalData1Sec
     * const HistoricalData1Sec = await prisma.historicalData1Sec.create({
     *   data: {
     *     // ... data to create a HistoricalData1Sec
     *   }
     * })
     * 
     */
    create<T extends HistoricalData1SecCreateArgs>(args: SelectSubset<T, HistoricalData1SecCreateArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HistoricalData1Secs.
     * @param {HistoricalData1SecCreateManyArgs} args - Arguments to create many HistoricalData1Secs.
     * @example
     * // Create many HistoricalData1Secs
     * const historicalData1Sec = await prisma.historicalData1Sec.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HistoricalData1SecCreateManyArgs>(args?: SelectSubset<T, HistoricalData1SecCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HistoricalData1Sec.
     * @param {HistoricalData1SecDeleteArgs} args - Arguments to delete one HistoricalData1Sec.
     * @example
     * // Delete one HistoricalData1Sec
     * const HistoricalData1Sec = await prisma.historicalData1Sec.delete({
     *   where: {
     *     // ... filter to delete one HistoricalData1Sec
     *   }
     * })
     * 
     */
    delete<T extends HistoricalData1SecDeleteArgs>(args: SelectSubset<T, HistoricalData1SecDeleteArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HistoricalData1Sec.
     * @param {HistoricalData1SecUpdateArgs} args - Arguments to update one HistoricalData1Sec.
     * @example
     * // Update one HistoricalData1Sec
     * const historicalData1Sec = await prisma.historicalData1Sec.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HistoricalData1SecUpdateArgs>(args: SelectSubset<T, HistoricalData1SecUpdateArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HistoricalData1Secs.
     * @param {HistoricalData1SecDeleteManyArgs} args - Arguments to filter HistoricalData1Secs to delete.
     * @example
     * // Delete a few HistoricalData1Secs
     * const { count } = await prisma.historicalData1Sec.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HistoricalData1SecDeleteManyArgs>(args?: SelectSubset<T, HistoricalData1SecDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistoricalData1Secs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricalData1SecUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HistoricalData1Secs
     * const historicalData1Sec = await prisma.historicalData1Sec.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HistoricalData1SecUpdateManyArgs>(args: SelectSubset<T, HistoricalData1SecUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HistoricalData1Sec.
     * @param {HistoricalData1SecUpsertArgs} args - Arguments to update or create a HistoricalData1Sec.
     * @example
     * // Update or create a HistoricalData1Sec
     * const historicalData1Sec = await prisma.historicalData1Sec.upsert({
     *   create: {
     *     // ... data to create a HistoricalData1Sec
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HistoricalData1Sec we want to update
     *   }
     * })
     */
    upsert<T extends HistoricalData1SecUpsertArgs>(args: SelectSubset<T, HistoricalData1SecUpsertArgs<ExtArgs>>): Prisma__HistoricalData1SecClient<$Result.GetResult<Prisma.$HistoricalData1SecPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HistoricalData1Secs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricalData1SecCountArgs} args - Arguments to filter HistoricalData1Secs to count.
     * @example
     * // Count the number of HistoricalData1Secs
     * const count = await prisma.historicalData1Sec.count({
     *   where: {
     *     // ... the filter for the HistoricalData1Secs we want to count
     *   }
     * })
    **/
    count<T extends HistoricalData1SecCountArgs>(
      args?: Subset<T, HistoricalData1SecCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HistoricalData1SecCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HistoricalData1Sec.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricalData1SecAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HistoricalData1SecAggregateArgs>(args: Subset<T, HistoricalData1SecAggregateArgs>): Prisma.PrismaPromise<GetHistoricalData1SecAggregateType<T>>

    /**
     * Group by HistoricalData1Sec.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricalData1SecGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HistoricalData1SecGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HistoricalData1SecGroupByArgs['orderBy'] }
        : { orderBy?: HistoricalData1SecGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HistoricalData1SecGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistoricalData1SecGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HistoricalData1Sec model
   */
  readonly fields: HistoricalData1SecFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HistoricalData1Sec.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HistoricalData1SecClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HistoricalData1Sec model
   */ 
  interface HistoricalData1SecFieldRefs {
    readonly timestamp: FieldRef<"HistoricalData1Sec", 'DateTime'>
    readonly currency: FieldRef<"HistoricalData1Sec", 'String'>
    readonly open: FieldRef<"HistoricalData1Sec", 'Float'>
    readonly high: FieldRef<"HistoricalData1Sec", 'Float'>
    readonly low: FieldRef<"HistoricalData1Sec", 'Float'>
    readonly close: FieldRef<"HistoricalData1Sec", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * HistoricalData1Sec findUnique
   */
  export type HistoricalData1SecFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * Filter, which HistoricalData1Sec to fetch.
     */
    where: HistoricalData1SecWhereUniqueInput
  }

  /**
   * HistoricalData1Sec findUniqueOrThrow
   */
  export type HistoricalData1SecFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * Filter, which HistoricalData1Sec to fetch.
     */
    where: HistoricalData1SecWhereUniqueInput
  }

  /**
   * HistoricalData1Sec findFirst
   */
  export type HistoricalData1SecFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * Filter, which HistoricalData1Sec to fetch.
     */
    where?: HistoricalData1SecWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricalData1Secs to fetch.
     */
    orderBy?: HistoricalData1SecOrderByWithRelationInput | HistoricalData1SecOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoricalData1Secs.
     */
    cursor?: HistoricalData1SecWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricalData1Secs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricalData1Secs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoricalData1Secs.
     */
    distinct?: HistoricalData1SecScalarFieldEnum | HistoricalData1SecScalarFieldEnum[]
  }

  /**
   * HistoricalData1Sec findFirstOrThrow
   */
  export type HistoricalData1SecFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * Filter, which HistoricalData1Sec to fetch.
     */
    where?: HistoricalData1SecWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricalData1Secs to fetch.
     */
    orderBy?: HistoricalData1SecOrderByWithRelationInput | HistoricalData1SecOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoricalData1Secs.
     */
    cursor?: HistoricalData1SecWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricalData1Secs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricalData1Secs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoricalData1Secs.
     */
    distinct?: HistoricalData1SecScalarFieldEnum | HistoricalData1SecScalarFieldEnum[]
  }

  /**
   * HistoricalData1Sec findMany
   */
  export type HistoricalData1SecFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * Filter, which HistoricalData1Secs to fetch.
     */
    where?: HistoricalData1SecWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricalData1Secs to fetch.
     */
    orderBy?: HistoricalData1SecOrderByWithRelationInput | HistoricalData1SecOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HistoricalData1Secs.
     */
    cursor?: HistoricalData1SecWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricalData1Secs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricalData1Secs.
     */
    skip?: number
    distinct?: HistoricalData1SecScalarFieldEnum | HistoricalData1SecScalarFieldEnum[]
  }

  /**
   * HistoricalData1Sec create
   */
  export type HistoricalData1SecCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * The data needed to create a HistoricalData1Sec.
     */
    data: XOR<HistoricalData1SecCreateInput, HistoricalData1SecUncheckedCreateInput>
  }

  /**
   * HistoricalData1Sec createMany
   */
  export type HistoricalData1SecCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HistoricalData1Secs.
     */
    data: HistoricalData1SecCreateManyInput | HistoricalData1SecCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HistoricalData1Sec update
   */
  export type HistoricalData1SecUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * The data needed to update a HistoricalData1Sec.
     */
    data: XOR<HistoricalData1SecUpdateInput, HistoricalData1SecUncheckedUpdateInput>
    /**
     * Choose, which HistoricalData1Sec to update.
     */
    where: HistoricalData1SecWhereUniqueInput
  }

  /**
   * HistoricalData1Sec updateMany
   */
  export type HistoricalData1SecUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HistoricalData1Secs.
     */
    data: XOR<HistoricalData1SecUpdateManyMutationInput, HistoricalData1SecUncheckedUpdateManyInput>
    /**
     * Filter which HistoricalData1Secs to update
     */
    where?: HistoricalData1SecWhereInput
  }

  /**
   * HistoricalData1Sec upsert
   */
  export type HistoricalData1SecUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * The filter to search for the HistoricalData1Sec to update in case it exists.
     */
    where: HistoricalData1SecWhereUniqueInput
    /**
     * In case the HistoricalData1Sec found by the `where` argument doesn't exist, create a new HistoricalData1Sec with this data.
     */
    create: XOR<HistoricalData1SecCreateInput, HistoricalData1SecUncheckedCreateInput>
    /**
     * In case the HistoricalData1Sec was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HistoricalData1SecUpdateInput, HistoricalData1SecUncheckedUpdateInput>
  }

  /**
   * HistoricalData1Sec delete
   */
  export type HistoricalData1SecDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
    /**
     * Filter which HistoricalData1Sec to delete.
     */
    where: HistoricalData1SecWhereUniqueInput
  }

  /**
   * HistoricalData1Sec deleteMany
   */
  export type HistoricalData1SecDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoricalData1Secs to delete
     */
    where?: HistoricalData1SecWhereInput
  }

  /**
   * HistoricalData1Sec without action
   */
  export type HistoricalData1SecDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricalData1Sec
     */
    select?: HistoricalData1SecSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const HistoricalData1SecScalarFieldEnum: {
    timestamp: 'timestamp',
    currency: 'currency',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close'
  };

  export type HistoricalData1SecScalarFieldEnum = (typeof HistoricalData1SecScalarFieldEnum)[keyof typeof HistoricalData1SecScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type HistoricalData1SecWhereInput = {
    AND?: HistoricalData1SecWhereInput | HistoricalData1SecWhereInput[]
    OR?: HistoricalData1SecWhereInput[]
    NOT?: HistoricalData1SecWhereInput | HistoricalData1SecWhereInput[]
    timestamp?: DateTimeFilter<"HistoricalData1Sec"> | Date | string
    currency?: StringFilter<"HistoricalData1Sec"> | string
    open?: FloatFilter<"HistoricalData1Sec"> | number
    high?: FloatFilter<"HistoricalData1Sec"> | number
    low?: FloatFilter<"HistoricalData1Sec"> | number
    close?: FloatFilter<"HistoricalData1Sec"> | number
  }

  export type HistoricalData1SecOrderByWithRelationInput = {
    timestamp?: SortOrder
    currency?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
  }

  export type HistoricalData1SecWhereUniqueInput = Prisma.AtLeast<{
    timestamp?: Date | string
    AND?: HistoricalData1SecWhereInput | HistoricalData1SecWhereInput[]
    OR?: HistoricalData1SecWhereInput[]
    NOT?: HistoricalData1SecWhereInput | HistoricalData1SecWhereInput[]
    currency?: StringFilter<"HistoricalData1Sec"> | string
    open?: FloatFilter<"HistoricalData1Sec"> | number
    high?: FloatFilter<"HistoricalData1Sec"> | number
    low?: FloatFilter<"HistoricalData1Sec"> | number
    close?: FloatFilter<"HistoricalData1Sec"> | number
  }, "timestamp">

  export type HistoricalData1SecOrderByWithAggregationInput = {
    timestamp?: SortOrder
    currency?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    _count?: HistoricalData1SecCountOrderByAggregateInput
    _avg?: HistoricalData1SecAvgOrderByAggregateInput
    _max?: HistoricalData1SecMaxOrderByAggregateInput
    _min?: HistoricalData1SecMinOrderByAggregateInput
    _sum?: HistoricalData1SecSumOrderByAggregateInput
  }

  export type HistoricalData1SecScalarWhereWithAggregatesInput = {
    AND?: HistoricalData1SecScalarWhereWithAggregatesInput | HistoricalData1SecScalarWhereWithAggregatesInput[]
    OR?: HistoricalData1SecScalarWhereWithAggregatesInput[]
    NOT?: HistoricalData1SecScalarWhereWithAggregatesInput | HistoricalData1SecScalarWhereWithAggregatesInput[]
    timestamp?: DateTimeWithAggregatesFilter<"HistoricalData1Sec"> | Date | string
    currency?: StringWithAggregatesFilter<"HistoricalData1Sec"> | string
    open?: FloatWithAggregatesFilter<"HistoricalData1Sec"> | number
    high?: FloatWithAggregatesFilter<"HistoricalData1Sec"> | number
    low?: FloatWithAggregatesFilter<"HistoricalData1Sec"> | number
    close?: FloatWithAggregatesFilter<"HistoricalData1Sec"> | number
  }

  export type HistoricalData1SecCreateInput = {
    timestamp: Date | string
    currency: string
    open: number
    high: number
    low: number
    close: number
  }

  export type HistoricalData1SecUncheckedCreateInput = {
    timestamp: Date | string
    currency: string
    open: number
    high: number
    low: number
    close: number
  }

  export type HistoricalData1SecUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
  }

  export type HistoricalData1SecUncheckedUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
  }

  export type HistoricalData1SecCreateManyInput = {
    timestamp: Date | string
    currency: string
    open: number
    high: number
    low: number
    close: number
  }

  export type HistoricalData1SecUpdateManyMutationInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
  }

  export type HistoricalData1SecUncheckedUpdateManyInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: StringFieldUpdateOperationsInput | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type HistoricalData1SecCountOrderByAggregateInput = {
    timestamp?: SortOrder
    currency?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
  }

  export type HistoricalData1SecAvgOrderByAggregateInput = {
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
  }

  export type HistoricalData1SecMaxOrderByAggregateInput = {
    timestamp?: SortOrder
    currency?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
  }

  export type HistoricalData1SecMinOrderByAggregateInput = {
    timestamp?: SortOrder
    currency?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
  }

  export type HistoricalData1SecSumOrderByAggregateInput = {
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use HistoricalData1SecDefaultArgs instead
     */
    export type HistoricalData1SecArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HistoricalData1SecDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}