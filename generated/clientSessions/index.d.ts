
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
 * Model session
 * 
 */
export type session = $Result.DefaultSelection<Prisma.$sessionPayload>
/**
 * Model operation
 * 
 */
export type operation = $Result.DefaultSelection<Prisma.$operationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
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
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
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
   * `prisma.session`: Exposes CRUD operations for the **session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.sessionDelegate<ExtArgs>;

  /**
   * `prisma.operation`: Exposes CRUD operations for the **operation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Operations
    * const operations = await prisma.operation.findMany()
    * ```
    */
  get operation(): Prisma.operationDelegate<ExtArgs>;
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
   * Prisma Client JS version: 5.17.0
   * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
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
    session: 'session',
    operation: 'operation'
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
      modelProps: "session" | "operation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      session: {
        payload: Prisma.$sessionPayload<ExtArgs>
        fields: Prisma.sessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findFirst: {
            args: Prisma.sessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findMany: {
            args: Prisma.sessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          create: {
            args: Prisma.sessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          createMany: {
            args: Prisma.sessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.sessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          update: {
            args: Prisma.sessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          deleteMany: {
            args: Prisma.sessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.sessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.sessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.sessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      operation: {
        payload: Prisma.$operationPayload<ExtArgs>
        fields: Prisma.operationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.operationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.operationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload>
          }
          findFirst: {
            args: Prisma.operationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.operationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload>
          }
          findMany: {
            args: Prisma.operationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload>[]
          }
          create: {
            args: Prisma.operationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload>
          }
          createMany: {
            args: Prisma.operationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.operationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload>
          }
          update: {
            args: Prisma.operationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload>
          }
          deleteMany: {
            args: Prisma.operationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.operationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.operationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$operationPayload>
          }
          aggregate: {
            args: Prisma.OperationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperation>
          }
          groupBy: {
            args: Prisma.operationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperationGroupByOutputType>[]
          }
          count: {
            args: Prisma.operationCountArgs<ExtArgs>
            result: $Utils.Optional<OperationCountAggregateOutputType> | number
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
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    operations: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operations?: boolean | SessionCountOutputTypeCountOperationsArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountOperationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: operationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    id: number | null
    totalOperations: number | null
    profitLoss: number | null
    averageGain: number | null
    maxDrawdown: number | null
    winRate: number | null
    currentCandleIndex: number | null
    accountSize: number | null
    currentBalance: number | null
  }

  export type SessionSumAggregateOutputType = {
    id: number | null
    totalOperations: number | null
    profitLoss: number | null
    averageGain: number | null
    maxDrawdown: number | null
    winRate: number | null
    currentCandleIndex: number | null
    accountSize: number | null
    currentBalance: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: number | null
    userId: string | null
    title: string | null
    description: string | null
    date: Date | null
    time: Date | null
    totalOperations: number | null
    profitLoss: number | null
    averageGain: number | null
    maxDrawdown: number | null
    winRate: number | null
    createdAt: Date | null
    startDate: Date | null
    endDate: Date | null
    currentCandleIndex: number | null
    accountSize: number | null
    currentBalance: number | null
    currency: string | null
    interval: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    title: string | null
    description: string | null
    date: Date | null
    time: Date | null
    totalOperations: number | null
    profitLoss: number | null
    averageGain: number | null
    maxDrawdown: number | null
    winRate: number | null
    createdAt: Date | null
    startDate: Date | null
    endDate: Date | null
    currentCandleIndex: number | null
    accountSize: number | null
    currentBalance: number | null
    currency: string | null
    interval: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    date: number
    time: number
    totalOperations: number
    profitLoss: number
    averageGain: number
    maxDrawdown: number
    winRate: number
    createdAt: number
    startDate: number
    endDate: number
    currentCandleIndex: number
    accountSize: number
    currentBalance: number
    currency: number
    interval: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    id?: true
    totalOperations?: true
    profitLoss?: true
    averageGain?: true
    maxDrawdown?: true
    winRate?: true
    currentCandleIndex?: true
    accountSize?: true
    currentBalance?: true
  }

  export type SessionSumAggregateInputType = {
    id?: true
    totalOperations?: true
    profitLoss?: true
    averageGain?: true
    maxDrawdown?: true
    winRate?: true
    currentCandleIndex?: true
    accountSize?: true
    currentBalance?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    date?: true
    time?: true
    totalOperations?: true
    profitLoss?: true
    averageGain?: true
    maxDrawdown?: true
    winRate?: true
    createdAt?: true
    startDate?: true
    endDate?: true
    currentCandleIndex?: true
    accountSize?: true
    currentBalance?: true
    currency?: true
    interval?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    date?: true
    time?: true
    totalOperations?: true
    profitLoss?: true
    averageGain?: true
    maxDrawdown?: true
    winRate?: true
    createdAt?: true
    startDate?: true
    endDate?: true
    currentCandleIndex?: true
    accountSize?: true
    currentBalance?: true
    currency?: true
    interval?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    date?: true
    time?: true
    totalOperations?: true
    profitLoss?: true
    averageGain?: true
    maxDrawdown?: true
    winRate?: true
    createdAt?: true
    startDate?: true
    endDate?: true
    currentCandleIndex?: true
    accountSize?: true
    currentBalance?: true
    currency?: true
    interval?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which session to aggregate.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type sessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionWhereInput
    orderBy?: sessionOrderByWithAggregationInput | sessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: sessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: number
    userId: string
    title: string
    description: string
    date: Date
    time: Date
    totalOperations: number
    profitLoss: number
    averageGain: number
    maxDrawdown: number
    winRate: number
    createdAt: Date
    startDate: Date | null
    endDate: Date | null
    currentCandleIndex: number
    accountSize: number
    currentBalance: number
    currency: string
    interval: string
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends sessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type sessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    time?: boolean
    totalOperations?: boolean
    profitLoss?: boolean
    averageGain?: boolean
    maxDrawdown?: boolean
    winRate?: boolean
    createdAt?: boolean
    startDate?: boolean
    endDate?: boolean
    currentCandleIndex?: boolean
    accountSize?: boolean
    currentBalance?: boolean
    currency?: boolean
    interval?: boolean
    operations?: boolean | session$operationsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>


  export type sessionSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    time?: boolean
    totalOperations?: boolean
    profitLoss?: boolean
    averageGain?: boolean
    maxDrawdown?: boolean
    winRate?: boolean
    createdAt?: boolean
    startDate?: boolean
    endDate?: boolean
    currentCandleIndex?: boolean
    accountSize?: boolean
    currentBalance?: boolean
    currency?: boolean
    interval?: boolean
  }

  export type sessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operations?: boolean | session$operationsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $sessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "session"
    objects: {
      operations: Prisma.$operationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      title: string
      description: string
      date: Date
      time: Date
      totalOperations: number
      profitLoss: number
      averageGain: number
      maxDrawdown: number
      winRate: number
      createdAt: Date
      startDate: Date | null
      endDate: Date | null
      currentCandleIndex: number
      accountSize: number
      currentBalance: number
      currency: string
      interval: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type sessionGetPayload<S extends boolean | null | undefined | sessionDefaultArgs> = $Result.GetResult<Prisma.$sessionPayload, S>

  type sessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<sessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface sessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['session'], meta: { name: 'session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {sessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sessionFindUniqueArgs>(args: SelectSubset<T, sessionFindUniqueArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {sessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sessionFindUniqueOrThrowArgs>(args: SelectSubset<T, sessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sessionFindFirstArgs>(args?: SelectSubset<T, sessionFindFirstArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sessionFindFirstOrThrowArgs>(args?: SelectSubset<T, sessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sessionFindManyArgs>(args?: SelectSubset<T, sessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {sessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends sessionCreateArgs>(args: SelectSubset<T, sessionCreateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {sessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sessionCreateManyArgs>(args?: SelectSubset<T, sessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {sessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends sessionDeleteArgs>(args: SelectSubset<T, sessionDeleteArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {sessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sessionUpdateArgs>(args: SelectSubset<T, sessionUpdateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {sessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sessionDeleteManyArgs>(args?: SelectSubset<T, sessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sessionUpdateManyArgs>(args: SelectSubset<T, sessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {sessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends sessionUpsertArgs>(args: SelectSubset<T, sessionUpsertArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends sessionCountArgs>(
      args?: Subset<T, sessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionGroupByArgs} args - Group by arguments.
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
      T extends sessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sessionGroupByArgs['orderBy'] }
        : { orderBy?: sessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, sessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the session model
   */
  readonly fields: sessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    operations<T extends session$operationsArgs<ExtArgs> = {}>(args?: Subset<T, session$operationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the session model
   */ 
  interface sessionFieldRefs {
    readonly id: FieldRef<"session", 'Int'>
    readonly userId: FieldRef<"session", 'String'>
    readonly title: FieldRef<"session", 'String'>
    readonly description: FieldRef<"session", 'String'>
    readonly date: FieldRef<"session", 'DateTime'>
    readonly time: FieldRef<"session", 'DateTime'>
    readonly totalOperations: FieldRef<"session", 'Int'>
    readonly profitLoss: FieldRef<"session", 'Float'>
    readonly averageGain: FieldRef<"session", 'Float'>
    readonly maxDrawdown: FieldRef<"session", 'Float'>
    readonly winRate: FieldRef<"session", 'Float'>
    readonly createdAt: FieldRef<"session", 'DateTime'>
    readonly startDate: FieldRef<"session", 'DateTime'>
    readonly endDate: FieldRef<"session", 'DateTime'>
    readonly currentCandleIndex: FieldRef<"session", 'Int'>
    readonly accountSize: FieldRef<"session", 'Float'>
    readonly currentBalance: FieldRef<"session", 'Float'>
    readonly currency: FieldRef<"session", 'String'>
    readonly interval: FieldRef<"session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * session findUnique
   */
  export type sessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findUniqueOrThrow
   */
  export type sessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findFirst
   */
  export type sessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findFirstOrThrow
   */
  export type sessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findMany
   */
  export type sessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session create
   */
  export type sessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The data needed to create a session.
     */
    data: XOR<sessionCreateInput, sessionUncheckedCreateInput>
  }

  /**
   * session createMany
   */
  export type sessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sessions.
     */
    data: sessionCreateManyInput | sessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * session update
   */
  export type sessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The data needed to update a session.
     */
    data: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
    /**
     * Choose, which session to update.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session updateMany
   */
  export type sessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionWhereInput
  }

  /**
   * session upsert
   */
  export type sessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The filter to search for the session to update in case it exists.
     */
    where: sessionWhereUniqueInput
    /**
     * In case the session found by the `where` argument doesn't exist, create a new session with this data.
     */
    create: XOR<sessionCreateInput, sessionUncheckedCreateInput>
    /**
     * In case the session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
  }

  /**
   * session delete
   */
  export type sessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter which session to delete.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session deleteMany
   */
  export type sessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessions to delete
     */
    where?: sessionWhereInput
  }

  /**
   * session.operations
   */
  export type session$operationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    where?: operationWhereInput
    orderBy?: operationOrderByWithRelationInput | operationOrderByWithRelationInput[]
    cursor?: operationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * session without action
   */
  export type sessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
  }


  /**
   * Model operation
   */

  export type AggregateOperation = {
    _count: OperationCountAggregateOutputType | null
    _avg: OperationAvgAggregateOutputType | null
    _sum: OperationSumAggregateOutputType | null
    _min: OperationMinAggregateOutputType | null
    _max: OperationMaxAggregateOutputType | null
  }

  export type OperationAvgAggregateOutputType = {
    id: number | null
    sessionId: number | null
    size: number | null
    entryPrice: number | null
    exitPrice: number | null
    profit: number | null
    tp: number | null
    sl: number | null
  }

  export type OperationSumAggregateOutputType = {
    id: number | null
    sessionId: number | null
    size: number | null
    entryPrice: number | null
    exitPrice: number | null
    profit: number | null
    tp: number | null
    sl: number | null
  }

  export type OperationMinAggregateOutputType = {
    id: number | null
    sessionId: number | null
    type: string | null
    orderType: string | null
    size: number | null
    entryPrice: number | null
    exitPrice: number | null
    profit: number | null
    tp: number | null
    sl: number | null
    createdAt: Date | null
  }

  export type OperationMaxAggregateOutputType = {
    id: number | null
    sessionId: number | null
    type: string | null
    orderType: string | null
    size: number | null
    entryPrice: number | null
    exitPrice: number | null
    profit: number | null
    tp: number | null
    sl: number | null
    createdAt: Date | null
  }

  export type OperationCountAggregateOutputType = {
    id: number
    sessionId: number
    type: number
    orderType: number
    size: number
    entryPrice: number
    exitPrice: number
    profit: number
    tp: number
    sl: number
    createdAt: number
    _all: number
  }


  export type OperationAvgAggregateInputType = {
    id?: true
    sessionId?: true
    size?: true
    entryPrice?: true
    exitPrice?: true
    profit?: true
    tp?: true
    sl?: true
  }

  export type OperationSumAggregateInputType = {
    id?: true
    sessionId?: true
    size?: true
    entryPrice?: true
    exitPrice?: true
    profit?: true
    tp?: true
    sl?: true
  }

  export type OperationMinAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    orderType?: true
    size?: true
    entryPrice?: true
    exitPrice?: true
    profit?: true
    tp?: true
    sl?: true
    createdAt?: true
  }

  export type OperationMaxAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    orderType?: true
    size?: true
    entryPrice?: true
    exitPrice?: true
    profit?: true
    tp?: true
    sl?: true
    createdAt?: true
  }

  export type OperationCountAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    orderType?: true
    size?: true
    entryPrice?: true
    exitPrice?: true
    profit?: true
    tp?: true
    sl?: true
    createdAt?: true
    _all?: true
  }

  export type OperationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which operation to aggregate.
     */
    where?: operationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of operations to fetch.
     */
    orderBy?: operationOrderByWithRelationInput | operationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: operationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned operations
    **/
    _count?: true | OperationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OperationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OperationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperationMaxAggregateInputType
  }

  export type GetOperationAggregateType<T extends OperationAggregateArgs> = {
        [P in keyof T & keyof AggregateOperation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperation[P]>
      : GetScalarType<T[P], AggregateOperation[P]>
  }




  export type operationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: operationWhereInput
    orderBy?: operationOrderByWithAggregationInput | operationOrderByWithAggregationInput[]
    by: OperationScalarFieldEnum[] | OperationScalarFieldEnum
    having?: operationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperationCountAggregateInputType | true
    _avg?: OperationAvgAggregateInputType
    _sum?: OperationSumAggregateInputType
    _min?: OperationMinAggregateInputType
    _max?: OperationMaxAggregateInputType
  }

  export type OperationGroupByOutputType = {
    id: number
    sessionId: number
    type: string
    orderType: string
    size: number
    entryPrice: number
    exitPrice: number | null
    profit: number | null
    tp: number | null
    sl: number | null
    createdAt: Date
    _count: OperationCountAggregateOutputType | null
    _avg: OperationAvgAggregateOutputType | null
    _sum: OperationSumAggregateOutputType | null
    _min: OperationMinAggregateOutputType | null
    _max: OperationMaxAggregateOutputType | null
  }

  type GetOperationGroupByPayload<T extends operationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperationGroupByOutputType[P]>
            : GetScalarType<T[P], OperationGroupByOutputType[P]>
        }
      >
    >


  export type operationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    type?: boolean
    orderType?: boolean
    size?: boolean
    entryPrice?: boolean
    exitPrice?: boolean
    profit?: boolean
    tp?: boolean
    sl?: boolean
    createdAt?: boolean
    session?: boolean | sessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operation"]>


  export type operationSelectScalar = {
    id?: boolean
    sessionId?: boolean
    type?: boolean
    orderType?: boolean
    size?: boolean
    entryPrice?: boolean
    exitPrice?: boolean
    profit?: boolean
    tp?: boolean
    sl?: boolean
    createdAt?: boolean
  }

  export type operationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | sessionDefaultArgs<ExtArgs>
  }

  export type $operationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "operation"
    objects: {
      session: Prisma.$sessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sessionId: number
      type: string
      orderType: string
      size: number
      entryPrice: number
      exitPrice: number | null
      profit: number | null
      tp: number | null
      sl: number | null
      createdAt: Date
    }, ExtArgs["result"]["operation"]>
    composites: {}
  }

  type operationGetPayload<S extends boolean | null | undefined | operationDefaultArgs> = $Result.GetResult<Prisma.$operationPayload, S>

  type operationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<operationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OperationCountAggregateInputType | true
    }

  export interface operationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['operation'], meta: { name: 'operation' } }
    /**
     * Find zero or one Operation that matches the filter.
     * @param {operationFindUniqueArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends operationFindUniqueArgs>(args: SelectSubset<T, operationFindUniqueArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Operation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {operationFindUniqueOrThrowArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends operationFindUniqueOrThrowArgs>(args: SelectSubset<T, operationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Operation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {operationFindFirstArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends operationFindFirstArgs>(args?: SelectSubset<T, operationFindFirstArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Operation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {operationFindFirstOrThrowArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends operationFindFirstOrThrowArgs>(args?: SelectSubset<T, operationFindFirstOrThrowArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Operations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {operationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Operations
     * const operations = await prisma.operation.findMany()
     * 
     * // Get first 10 Operations
     * const operations = await prisma.operation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const operationWithIdOnly = await prisma.operation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends operationFindManyArgs>(args?: SelectSubset<T, operationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Operation.
     * @param {operationCreateArgs} args - Arguments to create a Operation.
     * @example
     * // Create one Operation
     * const Operation = await prisma.operation.create({
     *   data: {
     *     // ... data to create a Operation
     *   }
     * })
     * 
     */
    create<T extends operationCreateArgs>(args: SelectSubset<T, operationCreateArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Operations.
     * @param {operationCreateManyArgs} args - Arguments to create many Operations.
     * @example
     * // Create many Operations
     * const operation = await prisma.operation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends operationCreateManyArgs>(args?: SelectSubset<T, operationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Operation.
     * @param {operationDeleteArgs} args - Arguments to delete one Operation.
     * @example
     * // Delete one Operation
     * const Operation = await prisma.operation.delete({
     *   where: {
     *     // ... filter to delete one Operation
     *   }
     * })
     * 
     */
    delete<T extends operationDeleteArgs>(args: SelectSubset<T, operationDeleteArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Operation.
     * @param {operationUpdateArgs} args - Arguments to update one Operation.
     * @example
     * // Update one Operation
     * const operation = await prisma.operation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends operationUpdateArgs>(args: SelectSubset<T, operationUpdateArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Operations.
     * @param {operationDeleteManyArgs} args - Arguments to filter Operations to delete.
     * @example
     * // Delete a few Operations
     * const { count } = await prisma.operation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends operationDeleteManyArgs>(args?: SelectSubset<T, operationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {operationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Operations
     * const operation = await prisma.operation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends operationUpdateManyArgs>(args: SelectSubset<T, operationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Operation.
     * @param {operationUpsertArgs} args - Arguments to update or create a Operation.
     * @example
     * // Update or create a Operation
     * const operation = await prisma.operation.upsert({
     *   create: {
     *     // ... data to create a Operation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Operation we want to update
     *   }
     * })
     */
    upsert<T extends operationUpsertArgs>(args: SelectSubset<T, operationUpsertArgs<ExtArgs>>): Prisma__operationClient<$Result.GetResult<Prisma.$operationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Operations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {operationCountArgs} args - Arguments to filter Operations to count.
     * @example
     * // Count the number of Operations
     * const count = await prisma.operation.count({
     *   where: {
     *     // ... the filter for the Operations we want to count
     *   }
     * })
    **/
    count<T extends operationCountArgs>(
      args?: Subset<T, operationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Operation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationAggregateArgs>(args: Subset<T, OperationAggregateArgs>): Prisma.PrismaPromise<GetOperationAggregateType<T>>

    /**
     * Group by Operation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {operationGroupByArgs} args - Group by arguments.
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
      T extends operationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: operationGroupByArgs['orderBy'] }
        : { orderBy?: operationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, operationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the operation model
   */
  readonly fields: operationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for operation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__operationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends sessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sessionDefaultArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the operation model
   */ 
  interface operationFieldRefs {
    readonly id: FieldRef<"operation", 'Int'>
    readonly sessionId: FieldRef<"operation", 'Int'>
    readonly type: FieldRef<"operation", 'String'>
    readonly orderType: FieldRef<"operation", 'String'>
    readonly size: FieldRef<"operation", 'Float'>
    readonly entryPrice: FieldRef<"operation", 'Float'>
    readonly exitPrice: FieldRef<"operation", 'Float'>
    readonly profit: FieldRef<"operation", 'Float'>
    readonly tp: FieldRef<"operation", 'Float'>
    readonly sl: FieldRef<"operation", 'Float'>
    readonly createdAt: FieldRef<"operation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * operation findUnique
   */
  export type operationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * Filter, which operation to fetch.
     */
    where: operationWhereUniqueInput
  }

  /**
   * operation findUniqueOrThrow
   */
  export type operationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * Filter, which operation to fetch.
     */
    where: operationWhereUniqueInput
  }

  /**
   * operation findFirst
   */
  export type operationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * Filter, which operation to fetch.
     */
    where?: operationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of operations to fetch.
     */
    orderBy?: operationOrderByWithRelationInput | operationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for operations.
     */
    cursor?: operationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * operation findFirstOrThrow
   */
  export type operationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * Filter, which operation to fetch.
     */
    where?: operationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of operations to fetch.
     */
    orderBy?: operationOrderByWithRelationInput | operationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for operations.
     */
    cursor?: operationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * operation findMany
   */
  export type operationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * Filter, which operations to fetch.
     */
    where?: operationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of operations to fetch.
     */
    orderBy?: operationOrderByWithRelationInput | operationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing operations.
     */
    cursor?: operationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` operations.
     */
    skip?: number
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * operation create
   */
  export type operationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * The data needed to create a operation.
     */
    data: XOR<operationCreateInput, operationUncheckedCreateInput>
  }

  /**
   * operation createMany
   */
  export type operationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many operations.
     */
    data: operationCreateManyInput | operationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * operation update
   */
  export type operationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * The data needed to update a operation.
     */
    data: XOR<operationUpdateInput, operationUncheckedUpdateInput>
    /**
     * Choose, which operation to update.
     */
    where: operationWhereUniqueInput
  }

  /**
   * operation updateMany
   */
  export type operationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update operations.
     */
    data: XOR<operationUpdateManyMutationInput, operationUncheckedUpdateManyInput>
    /**
     * Filter which operations to update
     */
    where?: operationWhereInput
  }

  /**
   * operation upsert
   */
  export type operationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * The filter to search for the operation to update in case it exists.
     */
    where: operationWhereUniqueInput
    /**
     * In case the operation found by the `where` argument doesn't exist, create a new operation with this data.
     */
    create: XOR<operationCreateInput, operationUncheckedCreateInput>
    /**
     * In case the operation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<operationUpdateInput, operationUncheckedUpdateInput>
  }

  /**
   * operation delete
   */
  export type operationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
    /**
     * Filter which operation to delete.
     */
    where: operationWhereUniqueInput
  }

  /**
   * operation deleteMany
   */
  export type operationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which operations to delete
     */
    where?: operationWhereInput
  }

  /**
   * operation without action
   */
  export type operationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the operation
     */
    select?: operationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: operationInclude<ExtArgs> | null
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


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    date: 'date',
    time: 'time',
    totalOperations: 'totalOperations',
    profitLoss: 'profitLoss',
    averageGain: 'averageGain',
    maxDrawdown: 'maxDrawdown',
    winRate: 'winRate',
    createdAt: 'createdAt',
    startDate: 'startDate',
    endDate: 'endDate',
    currentCandleIndex: 'currentCandleIndex',
    accountSize: 'accountSize',
    currentBalance: 'currentBalance',
    currency: 'currency',
    interval: 'interval'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const OperationScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    type: 'type',
    orderType: 'orderType',
    size: 'size',
    entryPrice: 'entryPrice',
    exitPrice: 'exitPrice',
    profit: 'profit',
    tp: 'tp',
    sl: 'sl',
    createdAt: 'createdAt'
  };

  export type OperationScalarFieldEnum = (typeof OperationScalarFieldEnum)[keyof typeof OperationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type sessionWhereInput = {
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    id?: IntFilter<"session"> | number
    userId?: StringFilter<"session"> | string
    title?: StringFilter<"session"> | string
    description?: StringFilter<"session"> | string
    date?: DateTimeFilter<"session"> | Date | string
    time?: DateTimeFilter<"session"> | Date | string
    totalOperations?: IntFilter<"session"> | number
    profitLoss?: FloatFilter<"session"> | number
    averageGain?: FloatFilter<"session"> | number
    maxDrawdown?: FloatFilter<"session"> | number
    winRate?: FloatFilter<"session"> | number
    createdAt?: DateTimeFilter<"session"> | Date | string
    startDate?: DateTimeNullableFilter<"session"> | Date | string | null
    endDate?: DateTimeNullableFilter<"session"> | Date | string | null
    currentCandleIndex?: IntFilter<"session"> | number
    accountSize?: FloatFilter<"session"> | number
    currentBalance?: FloatFilter<"session"> | number
    currency?: StringFilter<"session"> | string
    interval?: StringFilter<"session"> | string
    operations?: OperationListRelationFilter
  }

  export type sessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    totalOperations?: SortOrder
    profitLoss?: SortOrder
    averageGain?: SortOrder
    maxDrawdown?: SortOrder
    winRate?: SortOrder
    createdAt?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    currentCandleIndex?: SortOrder
    accountSize?: SortOrder
    currentBalance?: SortOrder
    currency?: SortOrder
    interval?: SortOrder
    operations?: operationOrderByRelationAggregateInput
  }

  export type sessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    userId?: StringFilter<"session"> | string
    title?: StringFilter<"session"> | string
    description?: StringFilter<"session"> | string
    date?: DateTimeFilter<"session"> | Date | string
    time?: DateTimeFilter<"session"> | Date | string
    totalOperations?: IntFilter<"session"> | number
    profitLoss?: FloatFilter<"session"> | number
    averageGain?: FloatFilter<"session"> | number
    maxDrawdown?: FloatFilter<"session"> | number
    winRate?: FloatFilter<"session"> | number
    createdAt?: DateTimeFilter<"session"> | Date | string
    startDate?: DateTimeNullableFilter<"session"> | Date | string | null
    endDate?: DateTimeNullableFilter<"session"> | Date | string | null
    currentCandleIndex?: IntFilter<"session"> | number
    accountSize?: FloatFilter<"session"> | number
    currentBalance?: FloatFilter<"session"> | number
    currency?: StringFilter<"session"> | string
    interval?: StringFilter<"session"> | string
    operations?: OperationListRelationFilter
  }, "id">

  export type sessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    totalOperations?: SortOrder
    profitLoss?: SortOrder
    averageGain?: SortOrder
    maxDrawdown?: SortOrder
    winRate?: SortOrder
    createdAt?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    currentCandleIndex?: SortOrder
    accountSize?: SortOrder
    currentBalance?: SortOrder
    currency?: SortOrder
    interval?: SortOrder
    _count?: sessionCountOrderByAggregateInput
    _avg?: sessionAvgOrderByAggregateInput
    _max?: sessionMaxOrderByAggregateInput
    _min?: sessionMinOrderByAggregateInput
    _sum?: sessionSumOrderByAggregateInput
  }

  export type sessionScalarWhereWithAggregatesInput = {
    AND?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    OR?: sessionScalarWhereWithAggregatesInput[]
    NOT?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"session"> | number
    userId?: StringWithAggregatesFilter<"session"> | string
    title?: StringWithAggregatesFilter<"session"> | string
    description?: StringWithAggregatesFilter<"session"> | string
    date?: DateTimeWithAggregatesFilter<"session"> | Date | string
    time?: DateTimeWithAggregatesFilter<"session"> | Date | string
    totalOperations?: IntWithAggregatesFilter<"session"> | number
    profitLoss?: FloatWithAggregatesFilter<"session"> | number
    averageGain?: FloatWithAggregatesFilter<"session"> | number
    maxDrawdown?: FloatWithAggregatesFilter<"session"> | number
    winRate?: FloatWithAggregatesFilter<"session"> | number
    createdAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    startDate?: DateTimeNullableWithAggregatesFilter<"session"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"session"> | Date | string | null
    currentCandleIndex?: IntWithAggregatesFilter<"session"> | number
    accountSize?: FloatWithAggregatesFilter<"session"> | number
    currentBalance?: FloatWithAggregatesFilter<"session"> | number
    currency?: StringWithAggregatesFilter<"session"> | string
    interval?: StringWithAggregatesFilter<"session"> | string
  }

  export type operationWhereInput = {
    AND?: operationWhereInput | operationWhereInput[]
    OR?: operationWhereInput[]
    NOT?: operationWhereInput | operationWhereInput[]
    id?: IntFilter<"operation"> | number
    sessionId?: IntFilter<"operation"> | number
    type?: StringFilter<"operation"> | string
    orderType?: StringFilter<"operation"> | string
    size?: FloatFilter<"operation"> | number
    entryPrice?: FloatFilter<"operation"> | number
    exitPrice?: FloatNullableFilter<"operation"> | number | null
    profit?: FloatNullableFilter<"operation"> | number | null
    tp?: FloatNullableFilter<"operation"> | number | null
    sl?: FloatNullableFilter<"operation"> | number | null
    createdAt?: DateTimeFilter<"operation"> | Date | string
    session?: XOR<SessionRelationFilter, sessionWhereInput>
  }

  export type operationOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    orderType?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    exitPrice?: SortOrderInput | SortOrder
    profit?: SortOrderInput | SortOrder
    tp?: SortOrderInput | SortOrder
    sl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: sessionOrderByWithRelationInput
  }

  export type operationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: operationWhereInput | operationWhereInput[]
    OR?: operationWhereInput[]
    NOT?: operationWhereInput | operationWhereInput[]
    sessionId?: IntFilter<"operation"> | number
    type?: StringFilter<"operation"> | string
    orderType?: StringFilter<"operation"> | string
    size?: FloatFilter<"operation"> | number
    entryPrice?: FloatFilter<"operation"> | number
    exitPrice?: FloatNullableFilter<"operation"> | number | null
    profit?: FloatNullableFilter<"operation"> | number | null
    tp?: FloatNullableFilter<"operation"> | number | null
    sl?: FloatNullableFilter<"operation"> | number | null
    createdAt?: DateTimeFilter<"operation"> | Date | string
    session?: XOR<SessionRelationFilter, sessionWhereInput>
  }, "id">

  export type operationOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    orderType?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    exitPrice?: SortOrderInput | SortOrder
    profit?: SortOrderInput | SortOrder
    tp?: SortOrderInput | SortOrder
    sl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: operationCountOrderByAggregateInput
    _avg?: operationAvgOrderByAggregateInput
    _max?: operationMaxOrderByAggregateInput
    _min?: operationMinOrderByAggregateInput
    _sum?: operationSumOrderByAggregateInput
  }

  export type operationScalarWhereWithAggregatesInput = {
    AND?: operationScalarWhereWithAggregatesInput | operationScalarWhereWithAggregatesInput[]
    OR?: operationScalarWhereWithAggregatesInput[]
    NOT?: operationScalarWhereWithAggregatesInput | operationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"operation"> | number
    sessionId?: IntWithAggregatesFilter<"operation"> | number
    type?: StringWithAggregatesFilter<"operation"> | string
    orderType?: StringWithAggregatesFilter<"operation"> | string
    size?: FloatWithAggregatesFilter<"operation"> | number
    entryPrice?: FloatWithAggregatesFilter<"operation"> | number
    exitPrice?: FloatNullableWithAggregatesFilter<"operation"> | number | null
    profit?: FloatNullableWithAggregatesFilter<"operation"> | number | null
    tp?: FloatNullableWithAggregatesFilter<"operation"> | number | null
    sl?: FloatNullableWithAggregatesFilter<"operation"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"operation"> | Date | string
  }

  export type sessionCreateInput = {
    userId: string
    title: string
    description: string
    date: Date | string
    time: Date | string
    totalOperations?: number
    profitLoss?: number
    averageGain?: number
    maxDrawdown?: number
    winRate?: number
    createdAt?: Date | string
    startDate?: Date | string | null
    endDate?: Date | string | null
    currentCandleIndex?: number
    accountSize?: number
    currentBalance?: number
    currency: string
    interval: string
    operations?: operationCreateNestedManyWithoutSessionInput
  }

  export type sessionUncheckedCreateInput = {
    id?: number
    userId: string
    title: string
    description: string
    date: Date | string
    time: Date | string
    totalOperations?: number
    profitLoss?: number
    averageGain?: number
    maxDrawdown?: number
    winRate?: number
    createdAt?: Date | string
    startDate?: Date | string | null
    endDate?: Date | string | null
    currentCandleIndex?: number
    accountSize?: number
    currentBalance?: number
    currency: string
    interval: string
    operations?: operationUncheckedCreateNestedManyWithoutSessionInput
  }

  export type sessionUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOperations?: IntFieldUpdateOperationsInput | number
    profitLoss?: FloatFieldUpdateOperationsInput | number
    averageGain?: FloatFieldUpdateOperationsInput | number
    maxDrawdown?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentCandleIndex?: IntFieldUpdateOperationsInput | number
    accountSize?: FloatFieldUpdateOperationsInput | number
    currentBalance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    operations?: operationUpdateManyWithoutSessionNestedInput
  }

  export type sessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOperations?: IntFieldUpdateOperationsInput | number
    profitLoss?: FloatFieldUpdateOperationsInput | number
    averageGain?: FloatFieldUpdateOperationsInput | number
    maxDrawdown?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentCandleIndex?: IntFieldUpdateOperationsInput | number
    accountSize?: FloatFieldUpdateOperationsInput | number
    currentBalance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
    operations?: operationUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type sessionCreateManyInput = {
    id?: number
    userId: string
    title: string
    description: string
    date: Date | string
    time: Date | string
    totalOperations?: number
    profitLoss?: number
    averageGain?: number
    maxDrawdown?: number
    winRate?: number
    createdAt?: Date | string
    startDate?: Date | string | null
    endDate?: Date | string | null
    currentCandleIndex?: number
    accountSize?: number
    currentBalance?: number
    currency: string
    interval: string
  }

  export type sessionUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOperations?: IntFieldUpdateOperationsInput | number
    profitLoss?: FloatFieldUpdateOperationsInput | number
    averageGain?: FloatFieldUpdateOperationsInput | number
    maxDrawdown?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentCandleIndex?: IntFieldUpdateOperationsInput | number
    accountSize?: FloatFieldUpdateOperationsInput | number
    currentBalance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
  }

  export type sessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOperations?: IntFieldUpdateOperationsInput | number
    profitLoss?: FloatFieldUpdateOperationsInput | number
    averageGain?: FloatFieldUpdateOperationsInput | number
    maxDrawdown?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentCandleIndex?: IntFieldUpdateOperationsInput | number
    accountSize?: FloatFieldUpdateOperationsInput | number
    currentBalance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
  }

  export type operationCreateInput = {
    type: string
    orderType: string
    size: number
    entryPrice: number
    exitPrice?: number | null
    profit?: number | null
    tp?: number | null
    sl?: number | null
    createdAt?: Date | string
    session: sessionCreateNestedOneWithoutOperationsInput
  }

  export type operationUncheckedCreateInput = {
    id?: number
    sessionId: number
    type: string
    orderType: string
    size: number
    entryPrice: number
    exitPrice?: number | null
    profit?: number | null
    tp?: number | null
    sl?: number | null
    createdAt?: Date | string
  }

  export type operationUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    orderType?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    entryPrice?: FloatFieldUpdateOperationsInput | number
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    profit?: NullableFloatFieldUpdateOperationsInput | number | null
    tp?: NullableFloatFieldUpdateOperationsInput | number | null
    sl?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: sessionUpdateOneRequiredWithoutOperationsNestedInput
  }

  export type operationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    orderType?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    entryPrice?: FloatFieldUpdateOperationsInput | number
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    profit?: NullableFloatFieldUpdateOperationsInput | number | null
    tp?: NullableFloatFieldUpdateOperationsInput | number | null
    sl?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type operationCreateManyInput = {
    id?: number
    sessionId: number
    type: string
    orderType: string
    size: number
    entryPrice: number
    exitPrice?: number | null
    profit?: number | null
    tp?: number | null
    sl?: number | null
    createdAt?: Date | string
  }

  export type operationUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    orderType?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    entryPrice?: FloatFieldUpdateOperationsInput | number
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    profit?: NullableFloatFieldUpdateOperationsInput | number | null
    tp?: NullableFloatFieldUpdateOperationsInput | number | null
    sl?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type operationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    orderType?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    entryPrice?: FloatFieldUpdateOperationsInput | number
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    profit?: NullableFloatFieldUpdateOperationsInput | number | null
    tp?: NullableFloatFieldUpdateOperationsInput | number | null
    sl?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OperationListRelationFilter = {
    every?: operationWhereInput
    some?: operationWhereInput
    none?: operationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type operationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    totalOperations?: SortOrder
    profitLoss?: SortOrder
    averageGain?: SortOrder
    maxDrawdown?: SortOrder
    winRate?: SortOrder
    createdAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    currentCandleIndex?: SortOrder
    accountSize?: SortOrder
    currentBalance?: SortOrder
    currency?: SortOrder
    interval?: SortOrder
  }

  export type sessionAvgOrderByAggregateInput = {
    id?: SortOrder
    totalOperations?: SortOrder
    profitLoss?: SortOrder
    averageGain?: SortOrder
    maxDrawdown?: SortOrder
    winRate?: SortOrder
    currentCandleIndex?: SortOrder
    accountSize?: SortOrder
    currentBalance?: SortOrder
  }

  export type sessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    totalOperations?: SortOrder
    profitLoss?: SortOrder
    averageGain?: SortOrder
    maxDrawdown?: SortOrder
    winRate?: SortOrder
    createdAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    currentCandleIndex?: SortOrder
    accountSize?: SortOrder
    currentBalance?: SortOrder
    currency?: SortOrder
    interval?: SortOrder
  }

  export type sessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    totalOperations?: SortOrder
    profitLoss?: SortOrder
    averageGain?: SortOrder
    maxDrawdown?: SortOrder
    winRate?: SortOrder
    createdAt?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    currentCandleIndex?: SortOrder
    accountSize?: SortOrder
    currentBalance?: SortOrder
    currency?: SortOrder
    interval?: SortOrder
  }

  export type sessionSumOrderByAggregateInput = {
    id?: SortOrder
    totalOperations?: SortOrder
    profitLoss?: SortOrder
    averageGain?: SortOrder
    maxDrawdown?: SortOrder
    winRate?: SortOrder
    currentCandleIndex?: SortOrder
    accountSize?: SortOrder
    currentBalance?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SessionRelationFilter = {
    is?: sessionWhereInput
    isNot?: sessionWhereInput
  }

  export type operationCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    orderType?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    exitPrice?: SortOrder
    profit?: SortOrder
    tp?: SortOrder
    sl?: SortOrder
    createdAt?: SortOrder
  }

  export type operationAvgOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    exitPrice?: SortOrder
    profit?: SortOrder
    tp?: SortOrder
    sl?: SortOrder
  }

  export type operationMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    orderType?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    exitPrice?: SortOrder
    profit?: SortOrder
    tp?: SortOrder
    sl?: SortOrder
    createdAt?: SortOrder
  }

  export type operationMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    orderType?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    exitPrice?: SortOrder
    profit?: SortOrder
    tp?: SortOrder
    sl?: SortOrder
    createdAt?: SortOrder
  }

  export type operationSumOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    size?: SortOrder
    entryPrice?: SortOrder
    exitPrice?: SortOrder
    profit?: SortOrder
    tp?: SortOrder
    sl?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type operationCreateNestedManyWithoutSessionInput = {
    create?: XOR<operationCreateWithoutSessionInput, operationUncheckedCreateWithoutSessionInput> | operationCreateWithoutSessionInput[] | operationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: operationCreateOrConnectWithoutSessionInput | operationCreateOrConnectWithoutSessionInput[]
    createMany?: operationCreateManySessionInputEnvelope
    connect?: operationWhereUniqueInput | operationWhereUniqueInput[]
  }

  export type operationUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<operationCreateWithoutSessionInput, operationUncheckedCreateWithoutSessionInput> | operationCreateWithoutSessionInput[] | operationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: operationCreateOrConnectWithoutSessionInput | operationCreateOrConnectWithoutSessionInput[]
    createMany?: operationCreateManySessionInputEnvelope
    connect?: operationWhereUniqueInput | operationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type operationUpdateManyWithoutSessionNestedInput = {
    create?: XOR<operationCreateWithoutSessionInput, operationUncheckedCreateWithoutSessionInput> | operationCreateWithoutSessionInput[] | operationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: operationCreateOrConnectWithoutSessionInput | operationCreateOrConnectWithoutSessionInput[]
    upsert?: operationUpsertWithWhereUniqueWithoutSessionInput | operationUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: operationCreateManySessionInputEnvelope
    set?: operationWhereUniqueInput | operationWhereUniqueInput[]
    disconnect?: operationWhereUniqueInput | operationWhereUniqueInput[]
    delete?: operationWhereUniqueInput | operationWhereUniqueInput[]
    connect?: operationWhereUniqueInput | operationWhereUniqueInput[]
    update?: operationUpdateWithWhereUniqueWithoutSessionInput | operationUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: operationUpdateManyWithWhereWithoutSessionInput | operationUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: operationScalarWhereInput | operationScalarWhereInput[]
  }

  export type operationUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<operationCreateWithoutSessionInput, operationUncheckedCreateWithoutSessionInput> | operationCreateWithoutSessionInput[] | operationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: operationCreateOrConnectWithoutSessionInput | operationCreateOrConnectWithoutSessionInput[]
    upsert?: operationUpsertWithWhereUniqueWithoutSessionInput | operationUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: operationCreateManySessionInputEnvelope
    set?: operationWhereUniqueInput | operationWhereUniqueInput[]
    disconnect?: operationWhereUniqueInput | operationWhereUniqueInput[]
    delete?: operationWhereUniqueInput | operationWhereUniqueInput[]
    connect?: operationWhereUniqueInput | operationWhereUniqueInput[]
    update?: operationUpdateWithWhereUniqueWithoutSessionInput | operationUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: operationUpdateManyWithWhereWithoutSessionInput | operationUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: operationScalarWhereInput | operationScalarWhereInput[]
  }

  export type sessionCreateNestedOneWithoutOperationsInput = {
    create?: XOR<sessionCreateWithoutOperationsInput, sessionUncheckedCreateWithoutOperationsInput>
    connectOrCreate?: sessionCreateOrConnectWithoutOperationsInput
    connect?: sessionWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type sessionUpdateOneRequiredWithoutOperationsNestedInput = {
    create?: XOR<sessionCreateWithoutOperationsInput, sessionUncheckedCreateWithoutOperationsInput>
    connectOrCreate?: sessionCreateOrConnectWithoutOperationsInput
    upsert?: sessionUpsertWithoutOperationsInput
    connect?: sessionWhereUniqueInput
    update?: XOR<XOR<sessionUpdateToOneWithWhereWithoutOperationsInput, sessionUpdateWithoutOperationsInput>, sessionUncheckedUpdateWithoutOperationsInput>
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type operationCreateWithoutSessionInput = {
    type: string
    orderType: string
    size: number
    entryPrice: number
    exitPrice?: number | null
    profit?: number | null
    tp?: number | null
    sl?: number | null
    createdAt?: Date | string
  }

  export type operationUncheckedCreateWithoutSessionInput = {
    id?: number
    type: string
    orderType: string
    size: number
    entryPrice: number
    exitPrice?: number | null
    profit?: number | null
    tp?: number | null
    sl?: number | null
    createdAt?: Date | string
  }

  export type operationCreateOrConnectWithoutSessionInput = {
    where: operationWhereUniqueInput
    create: XOR<operationCreateWithoutSessionInput, operationUncheckedCreateWithoutSessionInput>
  }

  export type operationCreateManySessionInputEnvelope = {
    data: operationCreateManySessionInput | operationCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type operationUpsertWithWhereUniqueWithoutSessionInput = {
    where: operationWhereUniqueInput
    update: XOR<operationUpdateWithoutSessionInput, operationUncheckedUpdateWithoutSessionInput>
    create: XOR<operationCreateWithoutSessionInput, operationUncheckedCreateWithoutSessionInput>
  }

  export type operationUpdateWithWhereUniqueWithoutSessionInput = {
    where: operationWhereUniqueInput
    data: XOR<operationUpdateWithoutSessionInput, operationUncheckedUpdateWithoutSessionInput>
  }

  export type operationUpdateManyWithWhereWithoutSessionInput = {
    where: operationScalarWhereInput
    data: XOR<operationUpdateManyMutationInput, operationUncheckedUpdateManyWithoutSessionInput>
  }

  export type operationScalarWhereInput = {
    AND?: operationScalarWhereInput | operationScalarWhereInput[]
    OR?: operationScalarWhereInput[]
    NOT?: operationScalarWhereInput | operationScalarWhereInput[]
    id?: IntFilter<"operation"> | number
    sessionId?: IntFilter<"operation"> | number
    type?: StringFilter<"operation"> | string
    orderType?: StringFilter<"operation"> | string
    size?: FloatFilter<"operation"> | number
    entryPrice?: FloatFilter<"operation"> | number
    exitPrice?: FloatNullableFilter<"operation"> | number | null
    profit?: FloatNullableFilter<"operation"> | number | null
    tp?: FloatNullableFilter<"operation"> | number | null
    sl?: FloatNullableFilter<"operation"> | number | null
    createdAt?: DateTimeFilter<"operation"> | Date | string
  }

  export type sessionCreateWithoutOperationsInput = {
    userId: string
    title: string
    description: string
    date: Date | string
    time: Date | string
    totalOperations?: number
    profitLoss?: number
    averageGain?: number
    maxDrawdown?: number
    winRate?: number
    createdAt?: Date | string
    startDate?: Date | string | null
    endDate?: Date | string | null
    currentCandleIndex?: number
    accountSize?: number
    currentBalance?: number
    currency: string
    interval: string
  }

  export type sessionUncheckedCreateWithoutOperationsInput = {
    id?: number
    userId: string
    title: string
    description: string
    date: Date | string
    time: Date | string
    totalOperations?: number
    profitLoss?: number
    averageGain?: number
    maxDrawdown?: number
    winRate?: number
    createdAt?: Date | string
    startDate?: Date | string | null
    endDate?: Date | string | null
    currentCandleIndex?: number
    accountSize?: number
    currentBalance?: number
    currency: string
    interval: string
  }

  export type sessionCreateOrConnectWithoutOperationsInput = {
    where: sessionWhereUniqueInput
    create: XOR<sessionCreateWithoutOperationsInput, sessionUncheckedCreateWithoutOperationsInput>
  }

  export type sessionUpsertWithoutOperationsInput = {
    update: XOR<sessionUpdateWithoutOperationsInput, sessionUncheckedUpdateWithoutOperationsInput>
    create: XOR<sessionCreateWithoutOperationsInput, sessionUncheckedCreateWithoutOperationsInput>
    where?: sessionWhereInput
  }

  export type sessionUpdateToOneWithWhereWithoutOperationsInput = {
    where?: sessionWhereInput
    data: XOR<sessionUpdateWithoutOperationsInput, sessionUncheckedUpdateWithoutOperationsInput>
  }

  export type sessionUpdateWithoutOperationsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOperations?: IntFieldUpdateOperationsInput | number
    profitLoss?: FloatFieldUpdateOperationsInput | number
    averageGain?: FloatFieldUpdateOperationsInput | number
    maxDrawdown?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentCandleIndex?: IntFieldUpdateOperationsInput | number
    accountSize?: FloatFieldUpdateOperationsInput | number
    currentBalance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
  }

  export type sessionUncheckedUpdateWithoutOperationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    totalOperations?: IntFieldUpdateOperationsInput | number
    profitLoss?: FloatFieldUpdateOperationsInput | number
    averageGain?: FloatFieldUpdateOperationsInput | number
    maxDrawdown?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentCandleIndex?: IntFieldUpdateOperationsInput | number
    accountSize?: FloatFieldUpdateOperationsInput | number
    currentBalance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    interval?: StringFieldUpdateOperationsInput | string
  }

  export type operationCreateManySessionInput = {
    id?: number
    type: string
    orderType: string
    size: number
    entryPrice: number
    exitPrice?: number | null
    profit?: number | null
    tp?: number | null
    sl?: number | null
    createdAt?: Date | string
  }

  export type operationUpdateWithoutSessionInput = {
    type?: StringFieldUpdateOperationsInput | string
    orderType?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    entryPrice?: FloatFieldUpdateOperationsInput | number
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    profit?: NullableFloatFieldUpdateOperationsInput | number | null
    tp?: NullableFloatFieldUpdateOperationsInput | number | null
    sl?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type operationUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    orderType?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    entryPrice?: FloatFieldUpdateOperationsInput | number
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    profit?: NullableFloatFieldUpdateOperationsInput | number | null
    tp?: NullableFloatFieldUpdateOperationsInput | number | null
    sl?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type operationUncheckedUpdateManyWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    orderType?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    entryPrice?: FloatFieldUpdateOperationsInput | number
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    profit?: NullableFloatFieldUpdateOperationsInput | number | null
    tp?: NullableFloatFieldUpdateOperationsInput | number | null
    sl?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use SessionCountOutputTypeDefaultArgs instead
     */
    export type SessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use sessionDefaultArgs instead
     */
    export type sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = sessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use operationDefaultArgs instead
     */
    export type operationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = operationDefaultArgs<ExtArgs>

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