
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model Publication
 * 
 */
export type Publication = $Result.DefaultSelection<Prisma.$PublicationPayload>
/**
 * Model TeamMember
 * 
 */
export type TeamMember = $Result.DefaultSelection<Prisma.$TeamMemberPayload>
/**
 * Model NewsEvent
 * 
 */
export type NewsEvent = $Result.DefaultSelection<Prisma.$NewsEventPayload>
/**
 * Model ResearchProject
 * 
 */
export type ResearchProject = $Result.DefaultSelection<Prisma.$ResearchProjectPayload>
/**
 * Model PillarContent
 * 
 */
export type PillarContent = $Result.DefaultSelection<Prisma.$PillarContentPayload>
/**
 * Model ContactMessage
 * 
 */
export type ContactMessage = $Result.DefaultSelection<Prisma.$ContactMessagePayload>
/**
 * Model NewsletterSubscriber
 * 
 */
export type NewsletterSubscriber = $Result.DefaultSelection<Prisma.$NewsletterSubscriberPayload>
/**
 * Model Partner
 * 
 */
export type Partner = $Result.DefaultSelection<Prisma.$PartnerPayload>
/**
 * Model ImpactMetric
 * 
 */
export type ImpactMetric = $Result.DefaultSelection<Prisma.$ImpactMetricPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PublicationType: {
  JOURNAL: 'JOURNAL',
  POLICY_BRIEF: 'POLICY_BRIEF',
  MANUAL: 'MANUAL',
  CONFERENCE: 'CONFERENCE',
  REPORT: 'REPORT'
};

export type PublicationType = (typeof PublicationType)[keyof typeof PublicationType]


export const PublicationStatus: {
  DRAFT: 'DRAFT',
  IN_REVIEW: 'IN_REVIEW',
  PUBLISHED: 'PUBLISHED'
};

export type PublicationStatus = (typeof PublicationStatus)[keyof typeof PublicationStatus]


export const NewsEventType: {
  NEWS: 'NEWS',
  EVENT: 'EVENT'
};

export type NewsEventType = (typeof NewsEventType)[keyof typeof NewsEventType]


export const NewsEventStatus: {
  DRAFT: 'DRAFT',
  UPCOMING: 'UPCOMING',
  PUBLISHED: 'PUBLISHED',
  PAST: 'PAST'
};

export type NewsEventStatus = (typeof NewsEventStatus)[keyof typeof NewsEventStatus]


export const ResearchStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

export type ResearchStatus = (typeof ResearchStatus)[keyof typeof ResearchStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PublicationType = $Enums.PublicationType

export const PublicationType: typeof $Enums.PublicationType

export type PublicationStatus = $Enums.PublicationStatus

export const PublicationStatus: typeof $Enums.PublicationStatus

export type NewsEventType = $Enums.NewsEventType

export const NewsEventType: typeof $Enums.NewsEventType

export type NewsEventStatus = $Enums.NewsEventStatus

export const NewsEventStatus: typeof $Enums.NewsEventStatus

export type ResearchStatus = $Enums.ResearchStatus

export const ResearchStatus: typeof $Enums.ResearchStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publication`: Exposes CRUD operations for the **Publication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Publications
    * const publications = await prisma.publication.findMany()
    * ```
    */
  get publication(): Prisma.PublicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMember`: Exposes CRUD operations for the **TeamMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMembers
    * const teamMembers = await prisma.teamMember.findMany()
    * ```
    */
  get teamMember(): Prisma.TeamMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsEvent`: Exposes CRUD operations for the **NewsEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsEvents
    * const newsEvents = await prisma.newsEvent.findMany()
    * ```
    */
  get newsEvent(): Prisma.NewsEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.researchProject`: Exposes CRUD operations for the **ResearchProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResearchProjects
    * const researchProjects = await prisma.researchProject.findMany()
    * ```
    */
  get researchProject(): Prisma.ResearchProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pillarContent`: Exposes CRUD operations for the **PillarContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PillarContents
    * const pillarContents = await prisma.pillarContent.findMany()
    * ```
    */
  get pillarContent(): Prisma.PillarContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactMessages
    * const contactMessages = await prisma.contactMessage.findMany()
    * ```
    */
  get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterSubscriber`: Exposes CRUD operations for the **NewsletterSubscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterSubscribers
    * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
    * ```
    */
  get newsletterSubscriber(): Prisma.NewsletterSubscriberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partners
    * const partners = await prisma.partner.findMany()
    * ```
    */
  get partner(): Prisma.PartnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.impactMetric`: Exposes CRUD operations for the **ImpactMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImpactMetrics
    * const impactMetrics = await prisma.impactMetric.findMany()
    * ```
    */
  get impactMetric(): Prisma.ImpactMetricDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    PasswordResetToken: 'PasswordResetToken',
    Publication: 'Publication',
    TeamMember: 'TeamMember',
    NewsEvent: 'NewsEvent',
    ResearchProject: 'ResearchProject',
    PillarContent: 'PillarContent',
    ContactMessage: 'ContactMessage',
    NewsletterSubscriber: 'NewsletterSubscriber',
    Partner: 'Partner',
    ImpactMetric: 'ImpactMetric'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "passwordResetToken" | "publication" | "teamMember" | "newsEvent" | "researchProject" | "pillarContent" | "contactMessage" | "newsletterSubscriber" | "partner" | "impactMetric"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      Publication: {
        payload: Prisma.$PublicationPayload<ExtArgs>
        fields: Prisma.PublicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findFirst: {
            args: Prisma.PublicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findMany: {
            args: Prisma.PublicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          create: {
            args: Prisma.PublicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          createMany: {
            args: Prisma.PublicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PublicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          update: {
            args: Prisma.PublicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          deleteMany: {
            args: Prisma.PublicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PublicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          aggregate: {
            args: Prisma.PublicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublication>
          }
          groupBy: {
            args: Prisma.PublicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicationCountArgs<ExtArgs>
            result: $Utils.Optional<PublicationCountAggregateOutputType> | number
          }
        }
      }
      TeamMember: {
        payload: Prisma.$TeamMemberPayload<ExtArgs>
        fields: Prisma.TeamMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findMany: {
            args: Prisma.TeamMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          create: {
            args: Prisma.TeamMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          createMany: {
            args: Prisma.TeamMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          update: {
            args: Prisma.TeamMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMember>
          }
          groupBy: {
            args: Prisma.TeamMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberCountAggregateOutputType> | number
          }
        }
      }
      NewsEvent: {
        payload: Prisma.$NewsEventPayload<ExtArgs>
        fields: Prisma.NewsEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload>
          }
          findFirst: {
            args: Prisma.NewsEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload>
          }
          findMany: {
            args: Prisma.NewsEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload>[]
          }
          create: {
            args: Prisma.NewsEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload>
          }
          createMany: {
            args: Prisma.NewsEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NewsEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload>
          }
          update: {
            args: Prisma.NewsEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload>
          }
          deleteMany: {
            args: Prisma.NewsEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NewsEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsEventPayload>
          }
          aggregate: {
            args: Prisma.NewsEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsEvent>
          }
          groupBy: {
            args: Prisma.NewsEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsEventCountArgs<ExtArgs>
            result: $Utils.Optional<NewsEventCountAggregateOutputType> | number
          }
        }
      }
      ResearchProject: {
        payload: Prisma.$ResearchProjectPayload<ExtArgs>
        fields: Prisma.ResearchProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResearchProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResearchProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload>
          }
          findFirst: {
            args: Prisma.ResearchProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResearchProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload>
          }
          findMany: {
            args: Prisma.ResearchProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload>[]
          }
          create: {
            args: Prisma.ResearchProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload>
          }
          createMany: {
            args: Prisma.ResearchProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ResearchProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload>
          }
          update: {
            args: Prisma.ResearchProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload>
          }
          deleteMany: {
            args: Prisma.ResearchProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResearchProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResearchProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchProjectPayload>
          }
          aggregate: {
            args: Prisma.ResearchProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResearchProject>
          }
          groupBy: {
            args: Prisma.ResearchProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResearchProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResearchProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ResearchProjectCountAggregateOutputType> | number
          }
        }
      }
      PillarContent: {
        payload: Prisma.$PillarContentPayload<ExtArgs>
        fields: Prisma.PillarContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PillarContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PillarContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload>
          }
          findFirst: {
            args: Prisma.PillarContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PillarContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload>
          }
          findMany: {
            args: Prisma.PillarContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload>[]
          }
          create: {
            args: Prisma.PillarContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload>
          }
          createMany: {
            args: Prisma.PillarContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PillarContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload>
          }
          update: {
            args: Prisma.PillarContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload>
          }
          deleteMany: {
            args: Prisma.PillarContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PillarContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PillarContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PillarContentPayload>
          }
          aggregate: {
            args: Prisma.PillarContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePillarContent>
          }
          groupBy: {
            args: Prisma.PillarContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PillarContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PillarContentCountArgs<ExtArgs>
            result: $Utils.Optional<PillarContentCountAggregateOutputType> | number
          }
        }
      }
      ContactMessage: {
        payload: Prisma.$ContactMessagePayload<ExtArgs>
        fields: Prisma.ContactMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findFirst: {
            args: Prisma.ContactMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findMany: {
            args: Prisma.ContactMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          create: {
            args: Prisma.ContactMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          createMany: {
            args: Prisma.ContactMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContactMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          update: {
            args: Prisma.ContactMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          deleteMany: {
            args: Prisma.ContactMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          aggregate: {
            args: Prisma.ContactMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactMessage>
          }
          groupBy: {
            args: Prisma.ContactMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageCountAggregateOutputType> | number
          }
        }
      }
      NewsletterSubscriber: {
        payload: Prisma.$NewsletterSubscriberPayload<ExtArgs>
        fields: Prisma.NewsletterSubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterSubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          findFirst: {
            args: Prisma.NewsletterSubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          findMany: {
            args: Prisma.NewsletterSubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>[]
          }
          create: {
            args: Prisma.NewsletterSubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          createMany: {
            args: Prisma.NewsletterSubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NewsletterSubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          update: {
            args: Prisma.NewsletterSubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterSubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterSubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NewsletterSubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          aggregate: {
            args: Prisma.NewsletterSubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterSubscriber>
          }
          groupBy: {
            args: Prisma.NewsletterSubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterSubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberCountAggregateOutputType> | number
          }
        }
      }
      Partner: {
        payload: Prisma.$PartnerPayload<ExtArgs>
        fields: Prisma.PartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findFirst: {
            args: Prisma.PartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findMany: {
            args: Prisma.PartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          create: {
            args: Prisma.PartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          createMany: {
            args: Prisma.PartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          update: {
            args: Prisma.PartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          deleteMany: {
            args: Prisma.PartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          aggregate: {
            args: Prisma.PartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartner>
          }
          groupBy: {
            args: Prisma.PartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerCountAggregateOutputType> | number
          }
        }
      }
      ImpactMetric: {
        payload: Prisma.$ImpactMetricPayload<ExtArgs>
        fields: Prisma.ImpactMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImpactMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImpactMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload>
          }
          findFirst: {
            args: Prisma.ImpactMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImpactMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload>
          }
          findMany: {
            args: Prisma.ImpactMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload>[]
          }
          create: {
            args: Prisma.ImpactMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload>
          }
          createMany: {
            args: Prisma.ImpactMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ImpactMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload>
          }
          update: {
            args: Prisma.ImpactMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload>
          }
          deleteMany: {
            args: Prisma.ImpactMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImpactMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ImpactMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImpactMetricPayload>
          }
          aggregate: {
            args: Prisma.ImpactMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImpactMetric>
          }
          groupBy: {
            args: Prisma.ImpactMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImpactMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImpactMetricCountArgs<ExtArgs>
            result: $Utils.Optional<ImpactMetricCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    passwordResetToken?: PasswordResetTokenOmit
    publication?: PublicationOmit
    teamMember?: TeamMemberOmit
    newsEvent?: NewsEventOmit
    researchProject?: ResearchProjectOmit
    pillarContent?: PillarContentOmit
    contactMessage?: ContactMessageOmit
    newsletterSubscriber?: NewsletterSubscriberOmit
    partner?: PartnerOmit
    impactMetric?: ImpactMetricOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    passwordResetTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    passwordHash: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passwordResetTokens?: boolean | User$passwordResetTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordResetTokens?: boolean | User$passwordResetTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      passwordHash: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    passwordResetTokens<T extends User$passwordResetTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.passwordResetTokens
   */
  export type User$passwordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    cursor?: PasswordResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    used: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    used: boolean
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>



  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "used" | "createdAt", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      used: boolean
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly used: FieldRef<"PasswordResetToken", 'Boolean'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model Publication
   */

  export type AggregatePublication = {
    _count: PublicationCountAggregateOutputType | null
    _avg: PublicationAvgAggregateOutputType | null
    _sum: PublicationSumAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  export type PublicationAvgAggregateOutputType = {
    year: number | null
  }

  export type PublicationSumAggregateOutputType = {
    year: number | null
  }

  export type PublicationMinAggregateOutputType = {
    id: string | null
    title: string | null
    authors: string | null
    year: number | null
    type: $Enums.PublicationType | null
    pillar: string | null
    status: $Enums.PublicationStatus | null
    abstract: string | null
    url: string | null
    doi: string | null
    pdfUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    authors: string | null
    year: number | null
    type: $Enums.PublicationType | null
    pillar: string | null
    status: $Enums.PublicationStatus | null
    abstract: string | null
    url: string | null
    doi: string | null
    pdfUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicationCountAggregateOutputType = {
    id: number
    title: number
    authors: number
    year: number
    type: number
    pillar: number
    status: number
    abstract: number
    url: number
    doi: number
    pdfUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PublicationAvgAggregateInputType = {
    year?: true
  }

  export type PublicationSumAggregateInputType = {
    year?: true
  }

  export type PublicationMinAggregateInputType = {
    id?: true
    title?: true
    authors?: true
    year?: true
    type?: true
    pillar?: true
    status?: true
    abstract?: true
    url?: true
    doi?: true
    pdfUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicationMaxAggregateInputType = {
    id?: true
    title?: true
    authors?: true
    year?: true
    type?: true
    pillar?: true
    status?: true
    abstract?: true
    url?: true
    doi?: true
    pdfUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicationCountAggregateInputType = {
    id?: true
    title?: true
    authors?: true
    year?: true
    type?: true
    pillar?: true
    status?: true
    abstract?: true
    url?: true
    doi?: true
    pdfUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PublicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publication to aggregate.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Publications
    **/
    _count?: true | PublicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PublicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PublicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicationMaxAggregateInputType
  }

  export type GetPublicationAggregateType<T extends PublicationAggregateArgs> = {
        [P in keyof T & keyof AggregatePublication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublication[P]>
      : GetScalarType<T[P], AggregatePublication[P]>
  }




  export type PublicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicationWhereInput
    orderBy?: PublicationOrderByWithAggregationInput | PublicationOrderByWithAggregationInput[]
    by: PublicationScalarFieldEnum[] | PublicationScalarFieldEnum
    having?: PublicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicationCountAggregateInputType | true
    _avg?: PublicationAvgAggregateInputType
    _sum?: PublicationSumAggregateInputType
    _min?: PublicationMinAggregateInputType
    _max?: PublicationMaxAggregateInputType
  }

  export type PublicationGroupByOutputType = {
    id: string
    title: string
    authors: string
    year: number
    type: $Enums.PublicationType
    pillar: string | null
    status: $Enums.PublicationStatus
    abstract: string | null
    url: string | null
    doi: string | null
    pdfUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: PublicationCountAggregateOutputType | null
    _avg: PublicationAvgAggregateOutputType | null
    _sum: PublicationSumAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  type GetPublicationGroupByPayload<T extends PublicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicationGroupByOutputType[P]>
            : GetScalarType<T[P], PublicationGroupByOutputType[P]>
        }
      >
    >


  export type PublicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    authors?: boolean
    year?: boolean
    type?: boolean
    pillar?: boolean
    status?: boolean
    abstract?: boolean
    url?: boolean
    doi?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["publication"]>



  export type PublicationSelectScalar = {
    id?: boolean
    title?: boolean
    authors?: boolean
    year?: boolean
    type?: boolean
    pillar?: boolean
    status?: boolean
    abstract?: boolean
    url?: boolean
    doi?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PublicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "authors" | "year" | "type" | "pillar" | "status" | "abstract" | "url" | "doi" | "pdfUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["publication"]>

  export type $PublicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Publication"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      authors: string
      year: number
      type: $Enums.PublicationType
      pillar: string | null
      status: $Enums.PublicationStatus
      abstract: string | null
      url: string | null
      doi: string | null
      pdfUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["publication"]>
    composites: {}
  }

  type PublicationGetPayload<S extends boolean | null | undefined | PublicationDefaultArgs> = $Result.GetResult<Prisma.$PublicationPayload, S>

  type PublicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicationCountAggregateInputType | true
    }

  export interface PublicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Publication'], meta: { name: 'Publication' } }
    /**
     * Find zero or one Publication that matches the filter.
     * @param {PublicationFindUniqueArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicationFindUniqueArgs>(args: SelectSubset<T, PublicationFindUniqueArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Publication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicationFindUniqueOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicationFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicationFindFirstArgs>(args?: SelectSubset<T, PublicationFindFirstArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicationFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Publications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Publications
     * const publications = await prisma.publication.findMany()
     * 
     * // Get first 10 Publications
     * const publications = await prisma.publication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicationWithIdOnly = await prisma.publication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicationFindManyArgs>(args?: SelectSubset<T, PublicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Publication.
     * @param {PublicationCreateArgs} args - Arguments to create a Publication.
     * @example
     * // Create one Publication
     * const Publication = await prisma.publication.create({
     *   data: {
     *     // ... data to create a Publication
     *   }
     * })
     * 
     */
    create<T extends PublicationCreateArgs>(args: SelectSubset<T, PublicationCreateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Publications.
     * @param {PublicationCreateManyArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publication = await prisma.publication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicationCreateManyArgs>(args?: SelectSubset<T, PublicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Publication.
     * @param {PublicationDeleteArgs} args - Arguments to delete one Publication.
     * @example
     * // Delete one Publication
     * const Publication = await prisma.publication.delete({
     *   where: {
     *     // ... filter to delete one Publication
     *   }
     * })
     * 
     */
    delete<T extends PublicationDeleteArgs>(args: SelectSubset<T, PublicationDeleteArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Publication.
     * @param {PublicationUpdateArgs} args - Arguments to update one Publication.
     * @example
     * // Update one Publication
     * const publication = await prisma.publication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicationUpdateArgs>(args: SelectSubset<T, PublicationUpdateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Publications.
     * @param {PublicationDeleteManyArgs} args - Arguments to filter Publications to delete.
     * @example
     * // Delete a few Publications
     * const { count } = await prisma.publication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicationDeleteManyArgs>(args?: SelectSubset<T, PublicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Publications
     * const publication = await prisma.publication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicationUpdateManyArgs>(args: SelectSubset<T, PublicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Publication.
     * @param {PublicationUpsertArgs} args - Arguments to update or create a Publication.
     * @example
     * // Update or create a Publication
     * const publication = await prisma.publication.upsert({
     *   create: {
     *     // ... data to create a Publication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Publication we want to update
     *   }
     * })
     */
    upsert<T extends PublicationUpsertArgs>(args: SelectSubset<T, PublicationUpsertArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationCountArgs} args - Arguments to filter Publications to count.
     * @example
     * // Count the number of Publications
     * const count = await prisma.publication.count({
     *   where: {
     *     // ... the filter for the Publications we want to count
     *   }
     * })
    **/
    count<T extends PublicationCountArgs>(
      args?: Subset<T, PublicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PublicationAggregateArgs>(args: Subset<T, PublicationAggregateArgs>): Prisma.PrismaPromise<GetPublicationAggregateType<T>>

    /**
     * Group by Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationGroupByArgs} args - Group by arguments.
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
      T extends PublicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicationGroupByArgs['orderBy'] }
        : { orderBy?: PublicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PublicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Publication model
   */
  readonly fields: PublicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Publication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Publication model
   */
  interface PublicationFieldRefs {
    readonly id: FieldRef<"Publication", 'String'>
    readonly title: FieldRef<"Publication", 'String'>
    readonly authors: FieldRef<"Publication", 'String'>
    readonly year: FieldRef<"Publication", 'Int'>
    readonly type: FieldRef<"Publication", 'PublicationType'>
    readonly pillar: FieldRef<"Publication", 'String'>
    readonly status: FieldRef<"Publication", 'PublicationStatus'>
    readonly abstract: FieldRef<"Publication", 'String'>
    readonly url: FieldRef<"Publication", 'String'>
    readonly doi: FieldRef<"Publication", 'String'>
    readonly pdfUrl: FieldRef<"Publication", 'String'>
    readonly createdAt: FieldRef<"Publication", 'DateTime'>
    readonly updatedAt: FieldRef<"Publication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Publication findUnique
   */
  export type PublicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findUniqueOrThrow
   */
  export type PublicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findFirst
   */
  export type PublicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findFirstOrThrow
   */
  export type PublicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findMany
   */
  export type PublicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publications to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication create
   */
  export type PublicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data needed to create a Publication.
     */
    data: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
  }

  /**
   * Publication createMany
   */
  export type PublicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Publications.
     */
    data: PublicationCreateManyInput | PublicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Publication update
   */
  export type PublicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data needed to update a Publication.
     */
    data: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
    /**
     * Choose, which Publication to update.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication updateMany
   */
  export type PublicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Publications.
     */
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyInput>
    /**
     * Filter which Publications to update
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to update.
     */
    limit?: number
  }

  /**
   * Publication upsert
   */
  export type PublicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The filter to search for the Publication to update in case it exists.
     */
    where: PublicationWhereUniqueInput
    /**
     * In case the Publication found by the `where` argument doesn't exist, create a new Publication with this data.
     */
    create: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
    /**
     * In case the Publication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
  }

  /**
   * Publication delete
   */
  export type PublicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter which Publication to delete.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication deleteMany
   */
  export type PublicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publications to delete
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to delete.
     */
    limit?: number
  }

  /**
   * Publication without action
   */
  export type PublicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
  }


  /**
   * Model TeamMember
   */

  export type AggregateTeamMember = {
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  export type TeamMemberMinAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    institution: string | null
    country: string | null
    pillar: string | null
    bio: string | null
    email: string | null
    imageUrl: string | null
    linkedin: string | null
    twitter: string | null
    instagram: string | null
    website: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMemberMaxAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    institution: string | null
    country: string | null
    pillar: string | null
    bio: string | null
    email: string | null
    imageUrl: string | null
    linkedin: string | null
    twitter: string | null
    instagram: string | null
    website: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMemberCountAggregateOutputType = {
    id: number
    name: number
    role: number
    institution: number
    country: number
    pillar: number
    bio: number
    email: number
    imageUrl: number
    linkedin: number
    twitter: number
    instagram: number
    website: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMemberMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    institution?: true
    country?: true
    pillar?: true
    bio?: true
    email?: true
    imageUrl?: true
    linkedin?: true
    twitter?: true
    instagram?: true
    website?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMemberMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    institution?: true
    country?: true
    pillar?: true
    bio?: true
    email?: true
    imageUrl?: true
    linkedin?: true
    twitter?: true
    instagram?: true
    website?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMemberCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    institution?: true
    country?: true
    pillar?: true
    bio?: true
    email?: true
    imageUrl?: true
    linkedin?: true
    twitter?: true
    instagram?: true
    website?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMember to aggregate.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMembers
    **/
    _count?: true | TeamMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberMaxAggregateInputType
  }

  export type GetTeamMemberAggregateType<T extends TeamMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMember[P]>
      : GetScalarType<T[P], AggregateTeamMember[P]>
  }




  export type TeamMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithAggregationInput | TeamMemberOrderByWithAggregationInput[]
    by: TeamMemberScalarFieldEnum[] | TeamMemberScalarFieldEnum
    having?: TeamMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberCountAggregateInputType | true
    _min?: TeamMemberMinAggregateInputType
    _max?: TeamMemberMaxAggregateInputType
  }

  export type TeamMemberGroupByOutputType = {
    id: string
    name: string
    role: string
    institution: string
    country: string
    pillar: string | null
    bio: string | null
    email: string | null
    imageUrl: string | null
    linkedin: string | null
    twitter: string | null
    instagram: string | null
    website: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  type GetTeamMemberGroupByPayload<T extends TeamMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    institution?: boolean
    country?: boolean
    pillar?: boolean
    bio?: boolean
    email?: boolean
    imageUrl?: boolean
    linkedin?: boolean
    twitter?: boolean
    instagram?: boolean
    website?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["teamMember"]>



  export type TeamMemberSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    institution?: boolean
    country?: boolean
    pillar?: boolean
    bio?: boolean
    email?: boolean
    imageUrl?: boolean
    linkedin?: boolean
    twitter?: boolean
    instagram?: boolean
    website?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "institution" | "country" | "pillar" | "bio" | "email" | "imageUrl" | "linkedin" | "twitter" | "instagram" | "website" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["teamMember"]>

  export type $TeamMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMember"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      role: string
      institution: string
      country: string
      pillar: string | null
      bio: string | null
      email: string | null
      imageUrl: string | null
      linkedin: string | null
      twitter: string | null
      instagram: string | null
      website: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teamMember"]>
    composites: {}
  }

  type TeamMemberGetPayload<S extends boolean | null | undefined | TeamMemberDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPayload, S>

  type TeamMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMemberCountAggregateInputType | true
    }

  export interface TeamMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMember'], meta: { name: 'TeamMember' } }
    /**
     * Find zero or one TeamMember that matches the filter.
     * @param {TeamMemberFindUniqueArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberFindUniqueArgs>(args: SelectSubset<T, TeamMemberFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMemberFindUniqueOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberFindFirstArgs>(args?: SelectSubset<T, TeamMemberFindFirstArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMembers
     * const teamMembers = await prisma.teamMember.findMany()
     * 
     * // Get first 10 TeamMembers
     * const teamMembers = await prisma.teamMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMemberFindManyArgs>(args?: SelectSubset<T, TeamMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMember.
     * @param {TeamMemberCreateArgs} args - Arguments to create a TeamMember.
     * @example
     * // Create one TeamMember
     * const TeamMember = await prisma.teamMember.create({
     *   data: {
     *     // ... data to create a TeamMember
     *   }
     * })
     * 
     */
    create<T extends TeamMemberCreateArgs>(args: SelectSubset<T, TeamMemberCreateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMembers.
     * @param {TeamMemberCreateManyArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberCreateManyArgs>(args?: SelectSubset<T, TeamMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamMember.
     * @param {TeamMemberDeleteArgs} args - Arguments to delete one TeamMember.
     * @example
     * // Delete one TeamMember
     * const TeamMember = await prisma.teamMember.delete({
     *   where: {
     *     // ... filter to delete one TeamMember
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberDeleteArgs>(args: SelectSubset<T, TeamMemberDeleteArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMember.
     * @param {TeamMemberUpdateArgs} args - Arguments to update one TeamMember.
     * @example
     * // Update one TeamMember
     * const teamMember = await prisma.teamMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberUpdateArgs>(args: SelectSubset<T, TeamMemberUpdateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMembers.
     * @param {TeamMemberDeleteManyArgs} args - Arguments to filter TeamMembers to delete.
     * @example
     * // Delete a few TeamMembers
     * const { count } = await prisma.teamMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberDeleteManyArgs>(args?: SelectSubset<T, TeamMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberUpdateManyArgs>(args: SelectSubset<T, TeamMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMember.
     * @param {TeamMemberUpsertArgs} args - Arguments to update or create a TeamMember.
     * @example
     * // Update or create a TeamMember
     * const teamMember = await prisma.teamMember.upsert({
     *   create: {
     *     // ... data to create a TeamMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMember we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberUpsertArgs>(args: SelectSubset<T, TeamMemberUpsertArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberCountArgs} args - Arguments to filter TeamMembers to count.
     * @example
     * // Count the number of TeamMembers
     * const count = await prisma.teamMember.count({
     *   where: {
     *     // ... the filter for the TeamMembers we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberCountArgs>(
      args?: Subset<T, TeamMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TeamMemberAggregateArgs>(args: Subset<T, TeamMemberAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberAggregateType<T>>

    /**
     * Group by TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberGroupByArgs} args - Group by arguments.
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
      T extends TeamMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TeamMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMember model
   */
  readonly fields: TeamMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TeamMember model
   */
  interface TeamMemberFieldRefs {
    readonly id: FieldRef<"TeamMember", 'String'>
    readonly name: FieldRef<"TeamMember", 'String'>
    readonly role: FieldRef<"TeamMember", 'String'>
    readonly institution: FieldRef<"TeamMember", 'String'>
    readonly country: FieldRef<"TeamMember", 'String'>
    readonly pillar: FieldRef<"TeamMember", 'String'>
    readonly bio: FieldRef<"TeamMember", 'String'>
    readonly email: FieldRef<"TeamMember", 'String'>
    readonly imageUrl: FieldRef<"TeamMember", 'String'>
    readonly linkedin: FieldRef<"TeamMember", 'String'>
    readonly twitter: FieldRef<"TeamMember", 'String'>
    readonly instagram: FieldRef<"TeamMember", 'String'>
    readonly website: FieldRef<"TeamMember", 'String'>
    readonly active: FieldRef<"TeamMember", 'Boolean'>
    readonly createdAt: FieldRef<"TeamMember", 'DateTime'>
    readonly updatedAt: FieldRef<"TeamMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMember findUnique
   */
  export type TeamMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findUniqueOrThrow
   */
  export type TeamMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findFirst
   */
  export type TeamMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findFirstOrThrow
   */
  export type TeamMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findMany
   */
  export type TeamMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter, which TeamMembers to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember create
   */
  export type TeamMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data needed to create a TeamMember.
     */
    data: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
  }

  /**
   * TeamMember createMany
   */
  export type TeamMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMember update
   */
  export type TeamMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data needed to update a TeamMember.
     */
    data: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
    /**
     * Choose, which TeamMember to update.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember updateMany
   */
  export type TeamMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to update.
     */
    limit?: number
  }

  /**
   * TeamMember upsert
   */
  export type TeamMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The filter to search for the TeamMember to update in case it exists.
     */
    where: TeamMemberWhereUniqueInput
    /**
     * In case the TeamMember found by the `where` argument doesn't exist, create a new TeamMember with this data.
     */
    create: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
    /**
     * In case the TeamMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
  }

  /**
   * TeamMember delete
   */
  export type TeamMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Filter which TeamMember to delete.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember deleteMany
   */
  export type TeamMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembers to delete
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to delete.
     */
    limit?: number
  }

  /**
   * TeamMember without action
   */
  export type TeamMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
  }


  /**
   * Model NewsEvent
   */

  export type AggregateNewsEvent = {
    _count: NewsEventCountAggregateOutputType | null
    _min: NewsEventMinAggregateOutputType | null
    _max: NewsEventMaxAggregateOutputType | null
  }

  export type NewsEventMinAggregateOutputType = {
    id: string | null
    title: string | null
    type: $Enums.NewsEventType | null
    date: Date | null
    status: $Enums.NewsEventStatus | null
    excerpt: string | null
    content: string | null
    location: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsEventMaxAggregateOutputType = {
    id: string | null
    title: string | null
    type: $Enums.NewsEventType | null
    date: Date | null
    status: $Enums.NewsEventStatus | null
    excerpt: string | null
    content: string | null
    location: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsEventCountAggregateOutputType = {
    id: number
    title: number
    type: number
    date: number
    status: number
    excerpt: number
    content: number
    location: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsEventMinAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    status?: true
    excerpt?: true
    content?: true
    location?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsEventMaxAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    status?: true
    excerpt?: true
    content?: true
    location?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsEventCountAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    status?: true
    excerpt?: true
    content?: true
    location?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsEvent to aggregate.
     */
    where?: NewsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsEvents to fetch.
     */
    orderBy?: NewsEventOrderByWithRelationInput | NewsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsEvents
    **/
    _count?: true | NewsEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsEventMaxAggregateInputType
  }

  export type GetNewsEventAggregateType<T extends NewsEventAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsEvent[P]>
      : GetScalarType<T[P], AggregateNewsEvent[P]>
  }




  export type NewsEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsEventWhereInput
    orderBy?: NewsEventOrderByWithAggregationInput | NewsEventOrderByWithAggregationInput[]
    by: NewsEventScalarFieldEnum[] | NewsEventScalarFieldEnum
    having?: NewsEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsEventCountAggregateInputType | true
    _min?: NewsEventMinAggregateInputType
    _max?: NewsEventMaxAggregateInputType
  }

  export type NewsEventGroupByOutputType = {
    id: string
    title: string
    type: $Enums.NewsEventType
    date: Date
    status: $Enums.NewsEventStatus
    excerpt: string | null
    content: string | null
    location: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: NewsEventCountAggregateOutputType | null
    _min: NewsEventMinAggregateOutputType | null
    _max: NewsEventMaxAggregateOutputType | null
  }

  type GetNewsEventGroupByPayload<T extends NewsEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsEventGroupByOutputType[P]>
            : GetScalarType<T[P], NewsEventGroupByOutputType[P]>
        }
      >
    >


  export type NewsEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    status?: boolean
    excerpt?: boolean
    content?: boolean
    location?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsEvent"]>



  export type NewsEventSelectScalar = {
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    status?: boolean
    excerpt?: boolean
    content?: boolean
    location?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "type" | "date" | "status" | "excerpt" | "content" | "location" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["newsEvent"]>

  export type $NewsEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      type: $Enums.NewsEventType
      date: Date
      status: $Enums.NewsEventStatus
      excerpt: string | null
      content: string | null
      location: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsEvent"]>
    composites: {}
  }

  type NewsEventGetPayload<S extends boolean | null | undefined | NewsEventDefaultArgs> = $Result.GetResult<Prisma.$NewsEventPayload, S>

  type NewsEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsEventCountAggregateInputType | true
    }

  export interface NewsEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsEvent'], meta: { name: 'NewsEvent' } }
    /**
     * Find zero or one NewsEvent that matches the filter.
     * @param {NewsEventFindUniqueArgs} args - Arguments to find a NewsEvent
     * @example
     * // Get one NewsEvent
     * const newsEvent = await prisma.newsEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsEventFindUniqueArgs>(args: SelectSubset<T, NewsEventFindUniqueArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsEventFindUniqueOrThrowArgs} args - Arguments to find a NewsEvent
     * @example
     * // Get one NewsEvent
     * const newsEvent = await prisma.newsEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsEventFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsEventFindFirstArgs} args - Arguments to find a NewsEvent
     * @example
     * // Get one NewsEvent
     * const newsEvent = await prisma.newsEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsEventFindFirstArgs>(args?: SelectSubset<T, NewsEventFindFirstArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsEventFindFirstOrThrowArgs} args - Arguments to find a NewsEvent
     * @example
     * // Get one NewsEvent
     * const newsEvent = await prisma.newsEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsEventFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsEvents
     * const newsEvents = await prisma.newsEvent.findMany()
     * 
     * // Get first 10 NewsEvents
     * const newsEvents = await prisma.newsEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsEventWithIdOnly = await prisma.newsEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsEventFindManyArgs>(args?: SelectSubset<T, NewsEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsEvent.
     * @param {NewsEventCreateArgs} args - Arguments to create a NewsEvent.
     * @example
     * // Create one NewsEvent
     * const NewsEvent = await prisma.newsEvent.create({
     *   data: {
     *     // ... data to create a NewsEvent
     *   }
     * })
     * 
     */
    create<T extends NewsEventCreateArgs>(args: SelectSubset<T, NewsEventCreateArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsEvents.
     * @param {NewsEventCreateManyArgs} args - Arguments to create many NewsEvents.
     * @example
     * // Create many NewsEvents
     * const newsEvent = await prisma.newsEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsEventCreateManyArgs>(args?: SelectSubset<T, NewsEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a NewsEvent.
     * @param {NewsEventDeleteArgs} args - Arguments to delete one NewsEvent.
     * @example
     * // Delete one NewsEvent
     * const NewsEvent = await prisma.newsEvent.delete({
     *   where: {
     *     // ... filter to delete one NewsEvent
     *   }
     * })
     * 
     */
    delete<T extends NewsEventDeleteArgs>(args: SelectSubset<T, NewsEventDeleteArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsEvent.
     * @param {NewsEventUpdateArgs} args - Arguments to update one NewsEvent.
     * @example
     * // Update one NewsEvent
     * const newsEvent = await prisma.newsEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsEventUpdateArgs>(args: SelectSubset<T, NewsEventUpdateArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsEvents.
     * @param {NewsEventDeleteManyArgs} args - Arguments to filter NewsEvents to delete.
     * @example
     * // Delete a few NewsEvents
     * const { count } = await prisma.newsEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsEventDeleteManyArgs>(args?: SelectSubset<T, NewsEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsEvents
     * const newsEvent = await prisma.newsEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsEventUpdateManyArgs>(args: SelectSubset<T, NewsEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NewsEvent.
     * @param {NewsEventUpsertArgs} args - Arguments to update or create a NewsEvent.
     * @example
     * // Update or create a NewsEvent
     * const newsEvent = await prisma.newsEvent.upsert({
     *   create: {
     *     // ... data to create a NewsEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsEvent we want to update
     *   }
     * })
     */
    upsert<T extends NewsEventUpsertArgs>(args: SelectSubset<T, NewsEventUpsertArgs<ExtArgs>>): Prisma__NewsEventClient<$Result.GetResult<Prisma.$NewsEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsEventCountArgs} args - Arguments to filter NewsEvents to count.
     * @example
     * // Count the number of NewsEvents
     * const count = await prisma.newsEvent.count({
     *   where: {
     *     // ... the filter for the NewsEvents we want to count
     *   }
     * })
    **/
    count<T extends NewsEventCountArgs>(
      args?: Subset<T, NewsEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NewsEventAggregateArgs>(args: Subset<T, NewsEventAggregateArgs>): Prisma.PrismaPromise<GetNewsEventAggregateType<T>>

    /**
     * Group by NewsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsEventGroupByArgs} args - Group by arguments.
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
      T extends NewsEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsEventGroupByArgs['orderBy'] }
        : { orderBy?: NewsEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NewsEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsEvent model
   */
  readonly fields: NewsEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the NewsEvent model
   */
  interface NewsEventFieldRefs {
    readonly id: FieldRef<"NewsEvent", 'String'>
    readonly title: FieldRef<"NewsEvent", 'String'>
    readonly type: FieldRef<"NewsEvent", 'NewsEventType'>
    readonly date: FieldRef<"NewsEvent", 'DateTime'>
    readonly status: FieldRef<"NewsEvent", 'NewsEventStatus'>
    readonly excerpt: FieldRef<"NewsEvent", 'String'>
    readonly content: FieldRef<"NewsEvent", 'String'>
    readonly location: FieldRef<"NewsEvent", 'String'>
    readonly imageUrl: FieldRef<"NewsEvent", 'String'>
    readonly createdAt: FieldRef<"NewsEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsEvent findUnique
   */
  export type NewsEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * Filter, which NewsEvent to fetch.
     */
    where: NewsEventWhereUniqueInput
  }

  /**
   * NewsEvent findUniqueOrThrow
   */
  export type NewsEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * Filter, which NewsEvent to fetch.
     */
    where: NewsEventWhereUniqueInput
  }

  /**
   * NewsEvent findFirst
   */
  export type NewsEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * Filter, which NewsEvent to fetch.
     */
    where?: NewsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsEvents to fetch.
     */
    orderBy?: NewsEventOrderByWithRelationInput | NewsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsEvents.
     */
    cursor?: NewsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsEvents.
     */
    distinct?: NewsEventScalarFieldEnum | NewsEventScalarFieldEnum[]
  }

  /**
   * NewsEvent findFirstOrThrow
   */
  export type NewsEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * Filter, which NewsEvent to fetch.
     */
    where?: NewsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsEvents to fetch.
     */
    orderBy?: NewsEventOrderByWithRelationInput | NewsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsEvents.
     */
    cursor?: NewsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsEvents.
     */
    distinct?: NewsEventScalarFieldEnum | NewsEventScalarFieldEnum[]
  }

  /**
   * NewsEvent findMany
   */
  export type NewsEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * Filter, which NewsEvents to fetch.
     */
    where?: NewsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsEvents to fetch.
     */
    orderBy?: NewsEventOrderByWithRelationInput | NewsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsEvents.
     */
    cursor?: NewsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsEvents.
     */
    distinct?: NewsEventScalarFieldEnum | NewsEventScalarFieldEnum[]
  }

  /**
   * NewsEvent create
   */
  export type NewsEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsEvent.
     */
    data: XOR<NewsEventCreateInput, NewsEventUncheckedCreateInput>
  }

  /**
   * NewsEvent createMany
   */
  export type NewsEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsEvents.
     */
    data: NewsEventCreateManyInput | NewsEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsEvent update
   */
  export type NewsEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsEvent.
     */
    data: XOR<NewsEventUpdateInput, NewsEventUncheckedUpdateInput>
    /**
     * Choose, which NewsEvent to update.
     */
    where: NewsEventWhereUniqueInput
  }

  /**
   * NewsEvent updateMany
   */
  export type NewsEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsEvents.
     */
    data: XOR<NewsEventUpdateManyMutationInput, NewsEventUncheckedUpdateManyInput>
    /**
     * Filter which NewsEvents to update
     */
    where?: NewsEventWhereInput
    /**
     * Limit how many NewsEvents to update.
     */
    limit?: number
  }

  /**
   * NewsEvent upsert
   */
  export type NewsEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsEvent to update in case it exists.
     */
    where: NewsEventWhereUniqueInput
    /**
     * In case the NewsEvent found by the `where` argument doesn't exist, create a new NewsEvent with this data.
     */
    create: XOR<NewsEventCreateInput, NewsEventUncheckedCreateInput>
    /**
     * In case the NewsEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsEventUpdateInput, NewsEventUncheckedUpdateInput>
  }

  /**
   * NewsEvent delete
   */
  export type NewsEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
    /**
     * Filter which NewsEvent to delete.
     */
    where: NewsEventWhereUniqueInput
  }

  /**
   * NewsEvent deleteMany
   */
  export type NewsEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsEvents to delete
     */
    where?: NewsEventWhereInput
    /**
     * Limit how many NewsEvents to delete.
     */
    limit?: number
  }

  /**
   * NewsEvent without action
   */
  export type NewsEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsEvent
     */
    select?: NewsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsEvent
     */
    omit?: NewsEventOmit<ExtArgs> | null
  }


  /**
   * Model ResearchProject
   */

  export type AggregateResearchProject = {
    _count: ResearchProjectCountAggregateOutputType | null
    _min: ResearchProjectMinAggregateOutputType | null
    _max: ResearchProjectMaxAggregateOutputType | null
  }

  export type ResearchProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    pillar: string | null
    status: $Enums.ResearchStatus | null
    lead: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResearchProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    pillar: string | null
    status: $Enums.ResearchStatus | null
    lead: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResearchProjectCountAggregateOutputType = {
    id: number
    title: number
    pillar: number
    status: number
    lead: number
    description: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResearchProjectMinAggregateInputType = {
    id?: true
    title?: true
    pillar?: true
    status?: true
    lead?: true
    description?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResearchProjectMaxAggregateInputType = {
    id?: true
    title?: true
    pillar?: true
    status?: true
    lead?: true
    description?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResearchProjectCountAggregateInputType = {
    id?: true
    title?: true
    pillar?: true
    status?: true
    lead?: true
    description?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResearchProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchProject to aggregate.
     */
    where?: ResearchProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: ResearchProjectOrderByWithRelationInput | ResearchProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResearchProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResearchProjects
    **/
    _count?: true | ResearchProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResearchProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResearchProjectMaxAggregateInputType
  }

  export type GetResearchProjectAggregateType<T extends ResearchProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateResearchProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResearchProject[P]>
      : GetScalarType<T[P], AggregateResearchProject[P]>
  }




  export type ResearchProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResearchProjectWhereInput
    orderBy?: ResearchProjectOrderByWithAggregationInput | ResearchProjectOrderByWithAggregationInput[]
    by: ResearchProjectScalarFieldEnum[] | ResearchProjectScalarFieldEnum
    having?: ResearchProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResearchProjectCountAggregateInputType | true
    _min?: ResearchProjectMinAggregateInputType
    _max?: ResearchProjectMaxAggregateInputType
  }

  export type ResearchProjectGroupByOutputType = {
    id: string
    title: string
    pillar: string
    status: $Enums.ResearchStatus
    lead: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ResearchProjectCountAggregateOutputType | null
    _min: ResearchProjectMinAggregateOutputType | null
    _max: ResearchProjectMaxAggregateOutputType | null
  }

  type GetResearchProjectGroupByPayload<T extends ResearchProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResearchProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResearchProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResearchProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ResearchProjectGroupByOutputType[P]>
        }
      >
    >


  export type ResearchProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    pillar?: boolean
    status?: boolean
    lead?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["researchProject"]>



  export type ResearchProjectSelectScalar = {
    id?: boolean
    title?: boolean
    pillar?: boolean
    status?: boolean
    lead?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResearchProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "pillar" | "status" | "lead" | "description" | "startDate" | "endDate" | "createdAt" | "updatedAt", ExtArgs["result"]["researchProject"]>

  export type $ResearchProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResearchProject"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      pillar: string
      status: $Enums.ResearchStatus
      lead: string | null
      description: string | null
      startDate: Date | null
      endDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["researchProject"]>
    composites: {}
  }

  type ResearchProjectGetPayload<S extends boolean | null | undefined | ResearchProjectDefaultArgs> = $Result.GetResult<Prisma.$ResearchProjectPayload, S>

  type ResearchProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResearchProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResearchProjectCountAggregateInputType | true
    }

  export interface ResearchProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResearchProject'], meta: { name: 'ResearchProject' } }
    /**
     * Find zero or one ResearchProject that matches the filter.
     * @param {ResearchProjectFindUniqueArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResearchProjectFindUniqueArgs>(args: SelectSubset<T, ResearchProjectFindUniqueArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResearchProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResearchProjectFindUniqueOrThrowArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResearchProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ResearchProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResearchProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectFindFirstArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResearchProjectFindFirstArgs>(args?: SelectSubset<T, ResearchProjectFindFirstArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResearchProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectFindFirstOrThrowArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResearchProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ResearchProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResearchProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResearchProjects
     * const researchProjects = await prisma.researchProject.findMany()
     * 
     * // Get first 10 ResearchProjects
     * const researchProjects = await prisma.researchProject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const researchProjectWithIdOnly = await prisma.researchProject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResearchProjectFindManyArgs>(args?: SelectSubset<T, ResearchProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResearchProject.
     * @param {ResearchProjectCreateArgs} args - Arguments to create a ResearchProject.
     * @example
     * // Create one ResearchProject
     * const ResearchProject = await prisma.researchProject.create({
     *   data: {
     *     // ... data to create a ResearchProject
     *   }
     * })
     * 
     */
    create<T extends ResearchProjectCreateArgs>(args: SelectSubset<T, ResearchProjectCreateArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResearchProjects.
     * @param {ResearchProjectCreateManyArgs} args - Arguments to create many ResearchProjects.
     * @example
     * // Create many ResearchProjects
     * const researchProject = await prisma.researchProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResearchProjectCreateManyArgs>(args?: SelectSubset<T, ResearchProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ResearchProject.
     * @param {ResearchProjectDeleteArgs} args - Arguments to delete one ResearchProject.
     * @example
     * // Delete one ResearchProject
     * const ResearchProject = await prisma.researchProject.delete({
     *   where: {
     *     // ... filter to delete one ResearchProject
     *   }
     * })
     * 
     */
    delete<T extends ResearchProjectDeleteArgs>(args: SelectSubset<T, ResearchProjectDeleteArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResearchProject.
     * @param {ResearchProjectUpdateArgs} args - Arguments to update one ResearchProject.
     * @example
     * // Update one ResearchProject
     * const researchProject = await prisma.researchProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResearchProjectUpdateArgs>(args: SelectSubset<T, ResearchProjectUpdateArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResearchProjects.
     * @param {ResearchProjectDeleteManyArgs} args - Arguments to filter ResearchProjects to delete.
     * @example
     * // Delete a few ResearchProjects
     * const { count } = await prisma.researchProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResearchProjectDeleteManyArgs>(args?: SelectSubset<T, ResearchProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResearchProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResearchProjects
     * const researchProject = await prisma.researchProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResearchProjectUpdateManyArgs>(args: SelectSubset<T, ResearchProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ResearchProject.
     * @param {ResearchProjectUpsertArgs} args - Arguments to update or create a ResearchProject.
     * @example
     * // Update or create a ResearchProject
     * const researchProject = await prisma.researchProject.upsert({
     *   create: {
     *     // ... data to create a ResearchProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResearchProject we want to update
     *   }
     * })
     */
    upsert<T extends ResearchProjectUpsertArgs>(args: SelectSubset<T, ResearchProjectUpsertArgs<ExtArgs>>): Prisma__ResearchProjectClient<$Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResearchProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectCountArgs} args - Arguments to filter ResearchProjects to count.
     * @example
     * // Count the number of ResearchProjects
     * const count = await prisma.researchProject.count({
     *   where: {
     *     // ... the filter for the ResearchProjects we want to count
     *   }
     * })
    **/
    count<T extends ResearchProjectCountArgs>(
      args?: Subset<T, ResearchProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResearchProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResearchProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResearchProjectAggregateArgs>(args: Subset<T, ResearchProjectAggregateArgs>): Prisma.PrismaPromise<GetResearchProjectAggregateType<T>>

    /**
     * Group by ResearchProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectGroupByArgs} args - Group by arguments.
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
      T extends ResearchProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResearchProjectGroupByArgs['orderBy'] }
        : { orderBy?: ResearchProjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResearchProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResearchProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResearchProject model
   */
  readonly fields: ResearchProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResearchProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResearchProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ResearchProject model
   */
  interface ResearchProjectFieldRefs {
    readonly id: FieldRef<"ResearchProject", 'String'>
    readonly title: FieldRef<"ResearchProject", 'String'>
    readonly pillar: FieldRef<"ResearchProject", 'String'>
    readonly status: FieldRef<"ResearchProject", 'ResearchStatus'>
    readonly lead: FieldRef<"ResearchProject", 'String'>
    readonly description: FieldRef<"ResearchProject", 'String'>
    readonly startDate: FieldRef<"ResearchProject", 'DateTime'>
    readonly endDate: FieldRef<"ResearchProject", 'DateTime'>
    readonly createdAt: FieldRef<"ResearchProject", 'DateTime'>
    readonly updatedAt: FieldRef<"ResearchProject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResearchProject findUnique
   */
  export type ResearchProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * Filter, which ResearchProject to fetch.
     */
    where: ResearchProjectWhereUniqueInput
  }

  /**
   * ResearchProject findUniqueOrThrow
   */
  export type ResearchProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * Filter, which ResearchProject to fetch.
     */
    where: ResearchProjectWhereUniqueInput
  }

  /**
   * ResearchProject findFirst
   */
  export type ResearchProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * Filter, which ResearchProject to fetch.
     */
    where?: ResearchProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: ResearchProjectOrderByWithRelationInput | ResearchProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResearchProjects.
     */
    cursor?: ResearchProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchProjects.
     */
    distinct?: ResearchProjectScalarFieldEnum | ResearchProjectScalarFieldEnum[]
  }

  /**
   * ResearchProject findFirstOrThrow
   */
  export type ResearchProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * Filter, which ResearchProject to fetch.
     */
    where?: ResearchProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: ResearchProjectOrderByWithRelationInput | ResearchProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResearchProjects.
     */
    cursor?: ResearchProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchProjects.
     */
    distinct?: ResearchProjectScalarFieldEnum | ResearchProjectScalarFieldEnum[]
  }

  /**
   * ResearchProject findMany
   */
  export type ResearchProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * Filter, which ResearchProjects to fetch.
     */
    where?: ResearchProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: ResearchProjectOrderByWithRelationInput | ResearchProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResearchProjects.
     */
    cursor?: ResearchProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchProjects.
     */
    distinct?: ResearchProjectScalarFieldEnum | ResearchProjectScalarFieldEnum[]
  }

  /**
   * ResearchProject create
   */
  export type ResearchProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * The data needed to create a ResearchProject.
     */
    data: XOR<ResearchProjectCreateInput, ResearchProjectUncheckedCreateInput>
  }

  /**
   * ResearchProject createMany
   */
  export type ResearchProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResearchProjects.
     */
    data: ResearchProjectCreateManyInput | ResearchProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResearchProject update
   */
  export type ResearchProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * The data needed to update a ResearchProject.
     */
    data: XOR<ResearchProjectUpdateInput, ResearchProjectUncheckedUpdateInput>
    /**
     * Choose, which ResearchProject to update.
     */
    where: ResearchProjectWhereUniqueInput
  }

  /**
   * ResearchProject updateMany
   */
  export type ResearchProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResearchProjects.
     */
    data: XOR<ResearchProjectUpdateManyMutationInput, ResearchProjectUncheckedUpdateManyInput>
    /**
     * Filter which ResearchProjects to update
     */
    where?: ResearchProjectWhereInput
    /**
     * Limit how many ResearchProjects to update.
     */
    limit?: number
  }

  /**
   * ResearchProject upsert
   */
  export type ResearchProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * The filter to search for the ResearchProject to update in case it exists.
     */
    where: ResearchProjectWhereUniqueInput
    /**
     * In case the ResearchProject found by the `where` argument doesn't exist, create a new ResearchProject with this data.
     */
    create: XOR<ResearchProjectCreateInput, ResearchProjectUncheckedCreateInput>
    /**
     * In case the ResearchProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResearchProjectUpdateInput, ResearchProjectUncheckedUpdateInput>
  }

  /**
   * ResearchProject delete
   */
  export type ResearchProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
    /**
     * Filter which ResearchProject to delete.
     */
    where: ResearchProjectWhereUniqueInput
  }

  /**
   * ResearchProject deleteMany
   */
  export type ResearchProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchProjects to delete
     */
    where?: ResearchProjectWhereInput
    /**
     * Limit how many ResearchProjects to delete.
     */
    limit?: number
  }

  /**
   * ResearchProject without action
   */
  export type ResearchProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: ResearchProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: ResearchProjectOmit<ExtArgs> | null
  }


  /**
   * Model PillarContent
   */

  export type AggregatePillarContent = {
    _count: PillarContentCountAggregateOutputType | null
    _min: PillarContentMinAggregateOutputType | null
    _max: PillarContentMaxAggregateOutputType | null
  }

  export type PillarContentMinAggregateOutputType = {
    id: string | null
    pillar: string | null
    title: string | null
    tagline: string | null
    laymanDesc: string | null
    imageUrl: string | null
  }

  export type PillarContentMaxAggregateOutputType = {
    id: string | null
    pillar: string | null
    title: string | null
    tagline: string | null
    laymanDesc: string | null
    imageUrl: string | null
  }

  export type PillarContentCountAggregateOutputType = {
    id: number
    pillar: number
    title: number
    tagline: number
    laymanDesc: number
    imageUrl: number
    _all: number
  }


  export type PillarContentMinAggregateInputType = {
    id?: true
    pillar?: true
    title?: true
    tagline?: true
    laymanDesc?: true
    imageUrl?: true
  }

  export type PillarContentMaxAggregateInputType = {
    id?: true
    pillar?: true
    title?: true
    tagline?: true
    laymanDesc?: true
    imageUrl?: true
  }

  export type PillarContentCountAggregateInputType = {
    id?: true
    pillar?: true
    title?: true
    tagline?: true
    laymanDesc?: true
    imageUrl?: true
    _all?: true
  }

  export type PillarContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PillarContent to aggregate.
     */
    where?: PillarContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PillarContents to fetch.
     */
    orderBy?: PillarContentOrderByWithRelationInput | PillarContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PillarContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PillarContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PillarContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PillarContents
    **/
    _count?: true | PillarContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PillarContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PillarContentMaxAggregateInputType
  }

  export type GetPillarContentAggregateType<T extends PillarContentAggregateArgs> = {
        [P in keyof T & keyof AggregatePillarContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePillarContent[P]>
      : GetScalarType<T[P], AggregatePillarContent[P]>
  }




  export type PillarContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PillarContentWhereInput
    orderBy?: PillarContentOrderByWithAggregationInput | PillarContentOrderByWithAggregationInput[]
    by: PillarContentScalarFieldEnum[] | PillarContentScalarFieldEnum
    having?: PillarContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PillarContentCountAggregateInputType | true
    _min?: PillarContentMinAggregateInputType
    _max?: PillarContentMaxAggregateInputType
  }

  export type PillarContentGroupByOutputType = {
    id: string
    pillar: string
    title: string
    tagline: string
    laymanDesc: string | null
    imageUrl: string | null
    _count: PillarContentCountAggregateOutputType | null
    _min: PillarContentMinAggregateOutputType | null
    _max: PillarContentMaxAggregateOutputType | null
  }

  type GetPillarContentGroupByPayload<T extends PillarContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PillarContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PillarContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PillarContentGroupByOutputType[P]>
            : GetScalarType<T[P], PillarContentGroupByOutputType[P]>
        }
      >
    >


  export type PillarContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pillar?: boolean
    title?: boolean
    tagline?: boolean
    laymanDesc?: boolean
    imageUrl?: boolean
  }, ExtArgs["result"]["pillarContent"]>



  export type PillarContentSelectScalar = {
    id?: boolean
    pillar?: boolean
    title?: boolean
    tagline?: boolean
    laymanDesc?: boolean
    imageUrl?: boolean
  }

  export type PillarContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pillar" | "title" | "tagline" | "laymanDesc" | "imageUrl", ExtArgs["result"]["pillarContent"]>

  export type $PillarContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PillarContent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pillar: string
      title: string
      tagline: string
      laymanDesc: string | null
      imageUrl: string | null
    }, ExtArgs["result"]["pillarContent"]>
    composites: {}
  }

  type PillarContentGetPayload<S extends boolean | null | undefined | PillarContentDefaultArgs> = $Result.GetResult<Prisma.$PillarContentPayload, S>

  type PillarContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PillarContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PillarContentCountAggregateInputType | true
    }

  export interface PillarContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PillarContent'], meta: { name: 'PillarContent' } }
    /**
     * Find zero or one PillarContent that matches the filter.
     * @param {PillarContentFindUniqueArgs} args - Arguments to find a PillarContent
     * @example
     * // Get one PillarContent
     * const pillarContent = await prisma.pillarContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PillarContentFindUniqueArgs>(args: SelectSubset<T, PillarContentFindUniqueArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PillarContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PillarContentFindUniqueOrThrowArgs} args - Arguments to find a PillarContent
     * @example
     * // Get one PillarContent
     * const pillarContent = await prisma.pillarContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PillarContentFindUniqueOrThrowArgs>(args: SelectSubset<T, PillarContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PillarContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PillarContentFindFirstArgs} args - Arguments to find a PillarContent
     * @example
     * // Get one PillarContent
     * const pillarContent = await prisma.pillarContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PillarContentFindFirstArgs>(args?: SelectSubset<T, PillarContentFindFirstArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PillarContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PillarContentFindFirstOrThrowArgs} args - Arguments to find a PillarContent
     * @example
     * // Get one PillarContent
     * const pillarContent = await prisma.pillarContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PillarContentFindFirstOrThrowArgs>(args?: SelectSubset<T, PillarContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PillarContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PillarContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PillarContents
     * const pillarContents = await prisma.pillarContent.findMany()
     * 
     * // Get first 10 PillarContents
     * const pillarContents = await prisma.pillarContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pillarContentWithIdOnly = await prisma.pillarContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PillarContentFindManyArgs>(args?: SelectSubset<T, PillarContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PillarContent.
     * @param {PillarContentCreateArgs} args - Arguments to create a PillarContent.
     * @example
     * // Create one PillarContent
     * const PillarContent = await prisma.pillarContent.create({
     *   data: {
     *     // ... data to create a PillarContent
     *   }
     * })
     * 
     */
    create<T extends PillarContentCreateArgs>(args: SelectSubset<T, PillarContentCreateArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PillarContents.
     * @param {PillarContentCreateManyArgs} args - Arguments to create many PillarContents.
     * @example
     * // Create many PillarContents
     * const pillarContent = await prisma.pillarContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PillarContentCreateManyArgs>(args?: SelectSubset<T, PillarContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PillarContent.
     * @param {PillarContentDeleteArgs} args - Arguments to delete one PillarContent.
     * @example
     * // Delete one PillarContent
     * const PillarContent = await prisma.pillarContent.delete({
     *   where: {
     *     // ... filter to delete one PillarContent
     *   }
     * })
     * 
     */
    delete<T extends PillarContentDeleteArgs>(args: SelectSubset<T, PillarContentDeleteArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PillarContent.
     * @param {PillarContentUpdateArgs} args - Arguments to update one PillarContent.
     * @example
     * // Update one PillarContent
     * const pillarContent = await prisma.pillarContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PillarContentUpdateArgs>(args: SelectSubset<T, PillarContentUpdateArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PillarContents.
     * @param {PillarContentDeleteManyArgs} args - Arguments to filter PillarContents to delete.
     * @example
     * // Delete a few PillarContents
     * const { count } = await prisma.pillarContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PillarContentDeleteManyArgs>(args?: SelectSubset<T, PillarContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PillarContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PillarContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PillarContents
     * const pillarContent = await prisma.pillarContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PillarContentUpdateManyArgs>(args: SelectSubset<T, PillarContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PillarContent.
     * @param {PillarContentUpsertArgs} args - Arguments to update or create a PillarContent.
     * @example
     * // Update or create a PillarContent
     * const pillarContent = await prisma.pillarContent.upsert({
     *   create: {
     *     // ... data to create a PillarContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PillarContent we want to update
     *   }
     * })
     */
    upsert<T extends PillarContentUpsertArgs>(args: SelectSubset<T, PillarContentUpsertArgs<ExtArgs>>): Prisma__PillarContentClient<$Result.GetResult<Prisma.$PillarContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PillarContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PillarContentCountArgs} args - Arguments to filter PillarContents to count.
     * @example
     * // Count the number of PillarContents
     * const count = await prisma.pillarContent.count({
     *   where: {
     *     // ... the filter for the PillarContents we want to count
     *   }
     * })
    **/
    count<T extends PillarContentCountArgs>(
      args?: Subset<T, PillarContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PillarContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PillarContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PillarContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PillarContentAggregateArgs>(args: Subset<T, PillarContentAggregateArgs>): Prisma.PrismaPromise<GetPillarContentAggregateType<T>>

    /**
     * Group by PillarContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PillarContentGroupByArgs} args - Group by arguments.
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
      T extends PillarContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PillarContentGroupByArgs['orderBy'] }
        : { orderBy?: PillarContentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PillarContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPillarContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PillarContent model
   */
  readonly fields: PillarContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PillarContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PillarContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PillarContent model
   */
  interface PillarContentFieldRefs {
    readonly id: FieldRef<"PillarContent", 'String'>
    readonly pillar: FieldRef<"PillarContent", 'String'>
    readonly title: FieldRef<"PillarContent", 'String'>
    readonly tagline: FieldRef<"PillarContent", 'String'>
    readonly laymanDesc: FieldRef<"PillarContent", 'String'>
    readonly imageUrl: FieldRef<"PillarContent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PillarContent findUnique
   */
  export type PillarContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * Filter, which PillarContent to fetch.
     */
    where: PillarContentWhereUniqueInput
  }

  /**
   * PillarContent findUniqueOrThrow
   */
  export type PillarContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * Filter, which PillarContent to fetch.
     */
    where: PillarContentWhereUniqueInput
  }

  /**
   * PillarContent findFirst
   */
  export type PillarContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * Filter, which PillarContent to fetch.
     */
    where?: PillarContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PillarContents to fetch.
     */
    orderBy?: PillarContentOrderByWithRelationInput | PillarContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PillarContents.
     */
    cursor?: PillarContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PillarContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PillarContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PillarContents.
     */
    distinct?: PillarContentScalarFieldEnum | PillarContentScalarFieldEnum[]
  }

  /**
   * PillarContent findFirstOrThrow
   */
  export type PillarContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * Filter, which PillarContent to fetch.
     */
    where?: PillarContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PillarContents to fetch.
     */
    orderBy?: PillarContentOrderByWithRelationInput | PillarContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PillarContents.
     */
    cursor?: PillarContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PillarContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PillarContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PillarContents.
     */
    distinct?: PillarContentScalarFieldEnum | PillarContentScalarFieldEnum[]
  }

  /**
   * PillarContent findMany
   */
  export type PillarContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * Filter, which PillarContents to fetch.
     */
    where?: PillarContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PillarContents to fetch.
     */
    orderBy?: PillarContentOrderByWithRelationInput | PillarContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PillarContents.
     */
    cursor?: PillarContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PillarContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PillarContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PillarContents.
     */
    distinct?: PillarContentScalarFieldEnum | PillarContentScalarFieldEnum[]
  }

  /**
   * PillarContent create
   */
  export type PillarContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * The data needed to create a PillarContent.
     */
    data: XOR<PillarContentCreateInput, PillarContentUncheckedCreateInput>
  }

  /**
   * PillarContent createMany
   */
  export type PillarContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PillarContents.
     */
    data: PillarContentCreateManyInput | PillarContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PillarContent update
   */
  export type PillarContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * The data needed to update a PillarContent.
     */
    data: XOR<PillarContentUpdateInput, PillarContentUncheckedUpdateInput>
    /**
     * Choose, which PillarContent to update.
     */
    where: PillarContentWhereUniqueInput
  }

  /**
   * PillarContent updateMany
   */
  export type PillarContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PillarContents.
     */
    data: XOR<PillarContentUpdateManyMutationInput, PillarContentUncheckedUpdateManyInput>
    /**
     * Filter which PillarContents to update
     */
    where?: PillarContentWhereInput
    /**
     * Limit how many PillarContents to update.
     */
    limit?: number
  }

  /**
   * PillarContent upsert
   */
  export type PillarContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * The filter to search for the PillarContent to update in case it exists.
     */
    where: PillarContentWhereUniqueInput
    /**
     * In case the PillarContent found by the `where` argument doesn't exist, create a new PillarContent with this data.
     */
    create: XOR<PillarContentCreateInput, PillarContentUncheckedCreateInput>
    /**
     * In case the PillarContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PillarContentUpdateInput, PillarContentUncheckedUpdateInput>
  }

  /**
   * PillarContent delete
   */
  export type PillarContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
    /**
     * Filter which PillarContent to delete.
     */
    where: PillarContentWhereUniqueInput
  }

  /**
   * PillarContent deleteMany
   */
  export type PillarContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PillarContents to delete
     */
    where?: PillarContentWhereInput
    /**
     * Limit how many PillarContents to delete.
     */
    limit?: number
  }

  /**
   * PillarContent without action
   */
  export type PillarContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PillarContent
     */
    select?: PillarContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PillarContent
     */
    omit?: PillarContentOmit<ExtArgs> | null
  }


  /**
   * Model ContactMessage
   */

  export type AggregateContactMessage = {
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  export type ContactMessageMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    organisation: string | null
    subject: string | null
    body: string | null
    read: boolean | null
    archived: boolean | null
    createdAt: Date | null
  }

  export type ContactMessageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    organisation: string | null
    subject: string | null
    body: string | null
    read: boolean | null
    archived: boolean | null
    createdAt: Date | null
  }

  export type ContactMessageCountAggregateOutputType = {
    id: number
    name: number
    email: number
    organisation: number
    subject: number
    body: number
    read: number
    archived: number
    createdAt: number
    _all: number
  }


  export type ContactMessageMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    organisation?: true
    subject?: true
    body?: true
    read?: true
    archived?: true
    createdAt?: true
  }

  export type ContactMessageMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    organisation?: true
    subject?: true
    body?: true
    read?: true
    archived?: true
    createdAt?: true
  }

  export type ContactMessageCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    organisation?: true
    subject?: true
    body?: true
    read?: true
    archived?: true
    createdAt?: true
    _all?: true
  }

  export type ContactMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessage to aggregate.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactMessages
    **/
    _count?: true | ContactMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMessageMaxAggregateInputType
  }

  export type GetContactMessageAggregateType<T extends ContactMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateContactMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactMessage[P]>
      : GetScalarType<T[P], AggregateContactMessage[P]>
  }




  export type ContactMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactMessageWhereInput
    orderBy?: ContactMessageOrderByWithAggregationInput | ContactMessageOrderByWithAggregationInput[]
    by: ContactMessageScalarFieldEnum[] | ContactMessageScalarFieldEnum
    having?: ContactMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactMessageCountAggregateInputType | true
    _min?: ContactMessageMinAggregateInputType
    _max?: ContactMessageMaxAggregateInputType
  }

  export type ContactMessageGroupByOutputType = {
    id: string
    name: string
    email: string
    organisation: string | null
    subject: string
    body: string
    read: boolean
    archived: boolean
    createdAt: Date
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  type GetContactMessageGroupByPayload<T extends ContactMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
        }
      >
    >


  export type ContactMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    organisation?: boolean
    subject?: boolean
    body?: boolean
    read?: boolean
    archived?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>



  export type ContactMessageSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    organisation?: boolean
    subject?: boolean
    body?: boolean
    read?: boolean
    archived?: boolean
    createdAt?: boolean
  }

  export type ContactMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "organisation" | "subject" | "body" | "read" | "archived" | "createdAt", ExtArgs["result"]["contactMessage"]>

  export type $ContactMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      organisation: string | null
      subject: string
      body: string
      read: boolean
      archived: boolean
      createdAt: Date
    }, ExtArgs["result"]["contactMessage"]>
    composites: {}
  }

  type ContactMessageGetPayload<S extends boolean | null | undefined | ContactMessageDefaultArgs> = $Result.GetResult<Prisma.$ContactMessagePayload, S>

  type ContactMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactMessageCountAggregateInputType | true
    }

  export interface ContactMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactMessage'], meta: { name: 'ContactMessage' } }
    /**
     * Find zero or one ContactMessage that matches the filter.
     * @param {ContactMessageFindUniqueArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactMessageFindUniqueArgs>(args: SelectSubset<T, ContactMessageFindUniqueArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactMessageFindUniqueOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactMessageFindFirstArgs>(args?: SelectSubset<T, ContactMessageFindFirstArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany()
     * 
     * // Get first 10 ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactMessageFindManyArgs>(args?: SelectSubset<T, ContactMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactMessage.
     * @param {ContactMessageCreateArgs} args - Arguments to create a ContactMessage.
     * @example
     * // Create one ContactMessage
     * const ContactMessage = await prisma.contactMessage.create({
     *   data: {
     *     // ... data to create a ContactMessage
     *   }
     * })
     * 
     */
    create<T extends ContactMessageCreateArgs>(args: SelectSubset<T, ContactMessageCreateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactMessages.
     * @param {ContactMessageCreateManyArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactMessageCreateManyArgs>(args?: SelectSubset<T, ContactMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ContactMessage.
     * @param {ContactMessageDeleteArgs} args - Arguments to delete one ContactMessage.
     * @example
     * // Delete one ContactMessage
     * const ContactMessage = await prisma.contactMessage.delete({
     *   where: {
     *     // ... filter to delete one ContactMessage
     *   }
     * })
     * 
     */
    delete<T extends ContactMessageDeleteArgs>(args: SelectSubset<T, ContactMessageDeleteArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactMessage.
     * @param {ContactMessageUpdateArgs} args - Arguments to update one ContactMessage.
     * @example
     * // Update one ContactMessage
     * const contactMessage = await prisma.contactMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactMessageUpdateArgs>(args: SelectSubset<T, ContactMessageUpdateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactMessages.
     * @param {ContactMessageDeleteManyArgs} args - Arguments to filter ContactMessages to delete.
     * @example
     * // Delete a few ContactMessages
     * const { count } = await prisma.contactMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactMessageDeleteManyArgs>(args?: SelectSubset<T, ContactMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactMessages
     * const contactMessage = await prisma.contactMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactMessageUpdateManyArgs>(args: SelectSubset<T, ContactMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactMessage.
     * @param {ContactMessageUpsertArgs} args - Arguments to update or create a ContactMessage.
     * @example
     * // Update or create a ContactMessage
     * const contactMessage = await prisma.contactMessage.upsert({
     *   create: {
     *     // ... data to create a ContactMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactMessage we want to update
     *   }
     * })
     */
    upsert<T extends ContactMessageUpsertArgs>(args: SelectSubset<T, ContactMessageUpsertArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageCountArgs} args - Arguments to filter ContactMessages to count.
     * @example
     * // Count the number of ContactMessages
     * const count = await prisma.contactMessage.count({
     *   where: {
     *     // ... the filter for the ContactMessages we want to count
     *   }
     * })
    **/
    count<T extends ContactMessageCountArgs>(
      args?: Subset<T, ContactMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactMessageAggregateArgs>(args: Subset<T, ContactMessageAggregateArgs>): Prisma.PrismaPromise<GetContactMessageAggregateType<T>>

    /**
     * Group by ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageGroupByArgs} args - Group by arguments.
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
      T extends ContactMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactMessageGroupByArgs['orderBy'] }
        : { orderBy?: ContactMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactMessage model
   */
  readonly fields: ContactMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ContactMessage model
   */
  interface ContactMessageFieldRefs {
    readonly id: FieldRef<"ContactMessage", 'String'>
    readonly name: FieldRef<"ContactMessage", 'String'>
    readonly email: FieldRef<"ContactMessage", 'String'>
    readonly organisation: FieldRef<"ContactMessage", 'String'>
    readonly subject: FieldRef<"ContactMessage", 'String'>
    readonly body: FieldRef<"ContactMessage", 'String'>
    readonly read: FieldRef<"ContactMessage", 'Boolean'>
    readonly archived: FieldRef<"ContactMessage", 'Boolean'>
    readonly createdAt: FieldRef<"ContactMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactMessage findUnique
   */
  export type ContactMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findUniqueOrThrow
   */
  export type ContactMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findFirst
   */
  export type ContactMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findFirstOrThrow
   */
  export type ContactMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findMany
   */
  export type ContactMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessages to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage create
   */
  export type ContactMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a ContactMessage.
     */
    data: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
  }

  /**
   * ContactMessage createMany
   */
  export type ContactMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactMessage update
   */
  export type ContactMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a ContactMessage.
     */
    data: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
    /**
     * Choose, which ContactMessage to update.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage updateMany
   */
  export type ContactMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactMessages.
     */
    data: XOR<ContactMessageUpdateManyMutationInput, ContactMessageUncheckedUpdateManyInput>
    /**
     * Filter which ContactMessages to update
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to update.
     */
    limit?: number
  }

  /**
   * ContactMessage upsert
   */
  export type ContactMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the ContactMessage to update in case it exists.
     */
    where: ContactMessageWhereUniqueInput
    /**
     * In case the ContactMessage found by the `where` argument doesn't exist, create a new ContactMessage with this data.
     */
    create: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
    /**
     * In case the ContactMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
  }

  /**
   * ContactMessage delete
   */
  export type ContactMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter which ContactMessage to delete.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage deleteMany
   */
  export type ContactMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessages to delete
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to delete.
     */
    limit?: number
  }

  /**
   * ContactMessage without action
   */
  export type ContactMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
  }


  /**
   * Model NewsletterSubscriber
   */

  export type AggregateNewsletterSubscriber = {
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  export type NewsletterSubscriberMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    source: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriberMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    source: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriberCountAggregateOutputType = {
    id: number
    email: number
    name: number
    source: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsletterSubscriberMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    source?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriberMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    source?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriberCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    source?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsletterSubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscriber to aggregate.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterSubscribers
    **/
    _count?: true | NewsletterSubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterSubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type GetNewsletterSubscriberAggregateType<T extends NewsletterSubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
      : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
  }




  export type NewsletterSubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterSubscriberWhereInput
    orderBy?: NewsletterSubscriberOrderByWithAggregationInput | NewsletterSubscriberOrderByWithAggregationInput[]
    by: NewsletterSubscriberScalarFieldEnum[] | NewsletterSubscriberScalarFieldEnum
    having?: NewsletterSubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterSubscriberCountAggregateInputType | true
    _min?: NewsletterSubscriberMinAggregateInputType
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type NewsletterSubscriberGroupByOutputType = {
    id: string
    email: string
    name: string | null
    source: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  type GetNewsletterSubscriberGroupByPayload<T extends NewsletterSubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterSubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterSubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterSubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    source?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>



  export type NewsletterSubscriberSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    source?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsletterSubscriberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "source" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["newsletterSubscriber"]>

  export type $NewsletterSubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterSubscriber"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      source: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsletterSubscriber"]>
    composites: {}
  }

  type NewsletterSubscriberGetPayload<S extends boolean | null | undefined | NewsletterSubscriberDefaultArgs> = $Result.GetResult<Prisma.$NewsletterSubscriberPayload, S>

  type NewsletterSubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterSubscriberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterSubscriberCountAggregateInputType | true
    }

  export interface NewsletterSubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterSubscriber'], meta: { name: 'NewsletterSubscriber' } }
    /**
     * Find zero or one NewsletterSubscriber that matches the filter.
     * @param {NewsletterSubscriberFindUniqueArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterSubscriberFindUniqueArgs>(args: SelectSubset<T, NewsletterSubscriberFindUniqueArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterSubscriber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterSubscriberFindUniqueOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterSubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindFirstArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterSubscriberFindFirstArgs>(args?: SelectSubset<T, NewsletterSubscriberFindFirstArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindFirstOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterSubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterSubscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
     * 
     * // Get first 10 NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterSubscriberWithIdOnly = await prisma.newsletterSubscriber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterSubscriberFindManyArgs>(args?: SelectSubset<T, NewsletterSubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterSubscriber.
     * @param {NewsletterSubscriberCreateArgs} args - Arguments to create a NewsletterSubscriber.
     * @example
     * // Create one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.create({
     *   data: {
     *     // ... data to create a NewsletterSubscriber
     *   }
     * })
     * 
     */
    create<T extends NewsletterSubscriberCreateArgs>(args: SelectSubset<T, NewsletterSubscriberCreateArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterSubscribers.
     * @param {NewsletterSubscriberCreateManyArgs} args - Arguments to create many NewsletterSubscribers.
     * @example
     * // Create many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterSubscriberCreateManyArgs>(args?: SelectSubset<T, NewsletterSubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a NewsletterSubscriber.
     * @param {NewsletterSubscriberDeleteArgs} args - Arguments to delete one NewsletterSubscriber.
     * @example
     * // Delete one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.delete({
     *   where: {
     *     // ... filter to delete one NewsletterSubscriber
     *   }
     * })
     * 
     */
    delete<T extends NewsletterSubscriberDeleteArgs>(args: SelectSubset<T, NewsletterSubscriberDeleteArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterSubscriber.
     * @param {NewsletterSubscriberUpdateArgs} args - Arguments to update one NewsletterSubscriber.
     * @example
     * // Update one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterSubscriberUpdateArgs>(args: SelectSubset<T, NewsletterSubscriberUpdateArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterSubscribers.
     * @param {NewsletterSubscriberDeleteManyArgs} args - Arguments to filter NewsletterSubscribers to delete.
     * @example
     * // Delete a few NewsletterSubscribers
     * const { count } = await prisma.newsletterSubscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterSubscriberDeleteManyArgs>(args?: SelectSubset<T, NewsletterSubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterSubscriberUpdateManyArgs>(args: SelectSubset<T, NewsletterSubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NewsletterSubscriber.
     * @param {NewsletterSubscriberUpsertArgs} args - Arguments to update or create a NewsletterSubscriber.
     * @example
     * // Update or create a NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.upsert({
     *   create: {
     *     // ... data to create a NewsletterSubscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterSubscriber we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterSubscriberUpsertArgs>(args: SelectSubset<T, NewsletterSubscriberUpsertArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberCountArgs} args - Arguments to filter NewsletterSubscribers to count.
     * @example
     * // Count the number of NewsletterSubscribers
     * const count = await prisma.newsletterSubscriber.count({
     *   where: {
     *     // ... the filter for the NewsletterSubscribers we want to count
     *   }
     * })
    **/
    count<T extends NewsletterSubscriberCountArgs>(
      args?: Subset<T, NewsletterSubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterSubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NewsletterSubscriberAggregateArgs>(args: Subset<T, NewsletterSubscriberAggregateArgs>): Prisma.PrismaPromise<GetNewsletterSubscriberAggregateType<T>>

    /**
     * Group by NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberGroupByArgs} args - Group by arguments.
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
      T extends NewsletterSubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterSubscriberGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterSubscriberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NewsletterSubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterSubscriber model
   */
  readonly fields: NewsletterSubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterSubscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterSubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the NewsletterSubscriber model
   */
  interface NewsletterSubscriberFieldRefs {
    readonly id: FieldRef<"NewsletterSubscriber", 'String'>
    readonly email: FieldRef<"NewsletterSubscriber", 'String'>
    readonly name: FieldRef<"NewsletterSubscriber", 'String'>
    readonly source: FieldRef<"NewsletterSubscriber", 'String'>
    readonly active: FieldRef<"NewsletterSubscriber", 'Boolean'>
    readonly createdAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterSubscriber findUnique
   */
  export type NewsletterSubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber findUniqueOrThrow
   */
  export type NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber findFirst
   */
  export type NewsletterSubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber findFirstOrThrow
   */
  export type NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber findMany
   */
  export type NewsletterSubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscribers to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber create
   */
  export type NewsletterSubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsletterSubscriber.
     */
    data: XOR<NewsletterSubscriberCreateInput, NewsletterSubscriberUncheckedCreateInput>
  }

  /**
   * NewsletterSubscriber createMany
   */
  export type NewsletterSubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterSubscribers.
     */
    data: NewsletterSubscriberCreateManyInput | NewsletterSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscriber update
   */
  export type NewsletterSubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsletterSubscriber.
     */
    data: XOR<NewsletterSubscriberUpdateInput, NewsletterSubscriberUncheckedUpdateInput>
    /**
     * Choose, which NewsletterSubscriber to update.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber updateMany
   */
  export type NewsletterSubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterSubscribers.
     */
    data: XOR<NewsletterSubscriberUpdateManyMutationInput, NewsletterSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscribers to update
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * Limit how many NewsletterSubscribers to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscriber upsert
   */
  export type NewsletterSubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsletterSubscriber to update in case it exists.
     */
    where: NewsletterSubscriberWhereUniqueInput
    /**
     * In case the NewsletterSubscriber found by the `where` argument doesn't exist, create a new NewsletterSubscriber with this data.
     */
    create: XOR<NewsletterSubscriberCreateInput, NewsletterSubscriberUncheckedCreateInput>
    /**
     * In case the NewsletterSubscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterSubscriberUpdateInput, NewsletterSubscriberUncheckedUpdateInput>
  }

  /**
   * NewsletterSubscriber delete
   */
  export type NewsletterSubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter which NewsletterSubscriber to delete.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber deleteMany
   */
  export type NewsletterSubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscribers to delete
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * Limit how many NewsletterSubscribers to delete.
     */
    limit?: number
  }

  /**
   * NewsletterSubscriber without action
   */
  export type NewsletterSubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
  }


  /**
   * Model Partner
   */

  export type AggregatePartner = {
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  export type PartnerAvgAggregateOutputType = {
    order: number | null
  }

  export type PartnerSumAggregateOutputType = {
    order: number | null
  }

  export type PartnerMinAggregateOutputType = {
    id: string | null
    name: string | null
    logoUrl: string | null
    website: string | null
    order: number | null
    active: boolean | null
    description: string | null
    role: string | null
    isHorizontal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    logoUrl: string | null
    website: string | null
    order: number | null
    active: boolean | null
    description: string | null
    role: string | null
    isHorizontal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerCountAggregateOutputType = {
    id: number
    name: number
    logoUrl: number
    website: number
    order: number
    active: number
    description: number
    role: number
    isHorizontal: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerAvgAggregateInputType = {
    order?: true
  }

  export type PartnerSumAggregateInputType = {
    order?: true
  }

  export type PartnerMinAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    website?: true
    order?: true
    active?: true
    description?: true
    role?: true
    isHorizontal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerMaxAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    website?: true
    order?: true
    active?: true
    description?: true
    role?: true
    isHorizontal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerCountAggregateInputType = {
    id?: true
    name?: true
    logoUrl?: true
    website?: true
    order?: true
    active?: true
    description?: true
    role?: true
    isHorizontal?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partner to aggregate.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partners
    **/
    _count?: true | PartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerMaxAggregateInputType
  }

  export type GetPartnerAggregateType<T extends PartnerAggregateArgs> = {
        [P in keyof T & keyof AggregatePartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartner[P]>
      : GetScalarType<T[P], AggregatePartner[P]>
  }




  export type PartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerWhereInput
    orderBy?: PartnerOrderByWithAggregationInput | PartnerOrderByWithAggregationInput[]
    by: PartnerScalarFieldEnum[] | PartnerScalarFieldEnum
    having?: PartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerCountAggregateInputType | true
    _avg?: PartnerAvgAggregateInputType
    _sum?: PartnerSumAggregateInputType
    _min?: PartnerMinAggregateInputType
    _max?: PartnerMaxAggregateInputType
  }

  export type PartnerGroupByOutputType = {
    id: string
    name: string
    logoUrl: string | null
    website: string | null
    order: number
    active: boolean
    description: string | null
    role: string | null
    isHorizontal: boolean
    createdAt: Date
    updatedAt: Date
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  type GetPartnerGroupByPayload<T extends PartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerGroupByOutputType[P]>
        }
      >
    >


  export type PartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    website?: boolean
    order?: boolean
    active?: boolean
    description?: boolean
    role?: boolean
    isHorizontal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>



  export type PartnerSelectScalar = {
    id?: boolean
    name?: boolean
    logoUrl?: boolean
    website?: boolean
    order?: boolean
    active?: boolean
    description?: boolean
    role?: boolean
    isHorizontal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "logoUrl" | "website" | "order" | "active" | "description" | "role" | "isHorizontal" | "createdAt" | "updatedAt", ExtArgs["result"]["partner"]>

  export type $PartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partner"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      logoUrl: string | null
      website: string | null
      order: number
      active: boolean
      description: string | null
      role: string | null
      isHorizontal: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partner"]>
    composites: {}
  }

  type PartnerGetPayload<S extends boolean | null | undefined | PartnerDefaultArgs> = $Result.GetResult<Prisma.$PartnerPayload, S>

  type PartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartnerCountAggregateInputType | true
    }

  export interface PartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partner'], meta: { name: 'Partner' } }
    /**
     * Find zero or one Partner that matches the filter.
     * @param {PartnerFindUniqueArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerFindUniqueArgs>(args: SelectSubset<T, PartnerFindUniqueArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Partner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartnerFindUniqueOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerFindFirstArgs>(args?: SelectSubset<T, PartnerFindFirstArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Partners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partners
     * const partners = await prisma.partner.findMany()
     * 
     * // Get first 10 Partners
     * const partners = await prisma.partner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerWithIdOnly = await prisma.partner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerFindManyArgs>(args?: SelectSubset<T, PartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Partner.
     * @param {PartnerCreateArgs} args - Arguments to create a Partner.
     * @example
     * // Create one Partner
     * const Partner = await prisma.partner.create({
     *   data: {
     *     // ... data to create a Partner
     *   }
     * })
     * 
     */
    create<T extends PartnerCreateArgs>(args: SelectSubset<T, PartnerCreateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Partners.
     * @param {PartnerCreateManyArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerCreateManyArgs>(args?: SelectSubset<T, PartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Partner.
     * @param {PartnerDeleteArgs} args - Arguments to delete one Partner.
     * @example
     * // Delete one Partner
     * const Partner = await prisma.partner.delete({
     *   where: {
     *     // ... filter to delete one Partner
     *   }
     * })
     * 
     */
    delete<T extends PartnerDeleteArgs>(args: SelectSubset<T, PartnerDeleteArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Partner.
     * @param {PartnerUpdateArgs} args - Arguments to update one Partner.
     * @example
     * // Update one Partner
     * const partner = await prisma.partner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerUpdateArgs>(args: SelectSubset<T, PartnerUpdateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Partners.
     * @param {PartnerDeleteManyArgs} args - Arguments to filter Partners to delete.
     * @example
     * // Delete a few Partners
     * const { count } = await prisma.partner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerDeleteManyArgs>(args?: SelectSubset<T, PartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerUpdateManyArgs>(args: SelectSubset<T, PartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Partner.
     * @param {PartnerUpsertArgs} args - Arguments to update or create a Partner.
     * @example
     * // Update or create a Partner
     * const partner = await prisma.partner.upsert({
     *   create: {
     *     // ... data to create a Partner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partner we want to update
     *   }
     * })
     */
    upsert<T extends PartnerUpsertArgs>(args: SelectSubset<T, PartnerUpsertArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerCountArgs} args - Arguments to filter Partners to count.
     * @example
     * // Count the number of Partners
     * const count = await prisma.partner.count({
     *   where: {
     *     // ... the filter for the Partners we want to count
     *   }
     * })
    **/
    count<T extends PartnerCountArgs>(
      args?: Subset<T, PartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PartnerAggregateArgs>(args: Subset<T, PartnerAggregateArgs>): Prisma.PrismaPromise<GetPartnerAggregateType<T>>

    /**
     * Group by Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerGroupByArgs} args - Group by arguments.
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
      T extends PartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerGroupByArgs['orderBy'] }
        : { orderBy?: PartnerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partner model
   */
  readonly fields: PartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Partner model
   */
  interface PartnerFieldRefs {
    readonly id: FieldRef<"Partner", 'String'>
    readonly name: FieldRef<"Partner", 'String'>
    readonly logoUrl: FieldRef<"Partner", 'String'>
    readonly website: FieldRef<"Partner", 'String'>
    readonly order: FieldRef<"Partner", 'Int'>
    readonly active: FieldRef<"Partner", 'Boolean'>
    readonly description: FieldRef<"Partner", 'String'>
    readonly role: FieldRef<"Partner", 'String'>
    readonly isHorizontal: FieldRef<"Partner", 'Boolean'>
    readonly createdAt: FieldRef<"Partner", 'DateTime'>
    readonly updatedAt: FieldRef<"Partner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Partner findUnique
   */
  export type PartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findUniqueOrThrow
   */
  export type PartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findFirst
   */
  export type PartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findFirstOrThrow
   */
  export type PartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findMany
   */
  export type PartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter, which Partners to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner create
   */
  export type PartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data needed to create a Partner.
     */
    data: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
  }

  /**
   * Partner createMany
   */
  export type PartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner update
   */
  export type PartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data needed to update a Partner.
     */
    data: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
    /**
     * Choose, which Partner to update.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner updateMany
   */
  export type PartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner upsert
   */
  export type PartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The filter to search for the Partner to update in case it exists.
     */
    where: PartnerWhereUniqueInput
    /**
     * In case the Partner found by the `where` argument doesn't exist, create a new Partner with this data.
     */
    create: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
    /**
     * In case the Partner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
  }

  /**
   * Partner delete
   */
  export type PartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Filter which Partner to delete.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner deleteMany
   */
  export type PartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partners to delete
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to delete.
     */
    limit?: number
  }

  /**
   * Partner without action
   */
  export type PartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
  }


  /**
   * Model ImpactMetric
   */

  export type AggregateImpactMetric = {
    _count: ImpactMetricCountAggregateOutputType | null
    _avg: ImpactMetricAvgAggregateOutputType | null
    _sum: ImpactMetricSumAggregateOutputType | null
    _min: ImpactMetricMinAggregateOutputType | null
    _max: ImpactMetricMaxAggregateOutputType | null
  }

  export type ImpactMetricAvgAggregateOutputType = {
    year: number | null
  }

  export type ImpactMetricSumAggregateOutputType = {
    year: number | null
  }

  export type ImpactMetricMinAggregateOutputType = {
    id: string | null
    label: string | null
    value: string | null
    pillar: string | null
    year: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImpactMetricMaxAggregateOutputType = {
    id: string | null
    label: string | null
    value: string | null
    pillar: string | null
    year: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImpactMetricCountAggregateOutputType = {
    id: number
    label: number
    value: number
    pillar: number
    year: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ImpactMetricAvgAggregateInputType = {
    year?: true
  }

  export type ImpactMetricSumAggregateInputType = {
    year?: true
  }

  export type ImpactMetricMinAggregateInputType = {
    id?: true
    label?: true
    value?: true
    pillar?: true
    year?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImpactMetricMaxAggregateInputType = {
    id?: true
    label?: true
    value?: true
    pillar?: true
    year?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImpactMetricCountAggregateInputType = {
    id?: true
    label?: true
    value?: true
    pillar?: true
    year?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ImpactMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImpactMetric to aggregate.
     */
    where?: ImpactMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImpactMetrics to fetch.
     */
    orderBy?: ImpactMetricOrderByWithRelationInput | ImpactMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImpactMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImpactMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImpactMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImpactMetrics
    **/
    _count?: true | ImpactMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImpactMetricAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImpactMetricSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImpactMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImpactMetricMaxAggregateInputType
  }

  export type GetImpactMetricAggregateType<T extends ImpactMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateImpactMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImpactMetric[P]>
      : GetScalarType<T[P], AggregateImpactMetric[P]>
  }




  export type ImpactMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImpactMetricWhereInput
    orderBy?: ImpactMetricOrderByWithAggregationInput | ImpactMetricOrderByWithAggregationInput[]
    by: ImpactMetricScalarFieldEnum[] | ImpactMetricScalarFieldEnum
    having?: ImpactMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImpactMetricCountAggregateInputType | true
    _avg?: ImpactMetricAvgAggregateInputType
    _sum?: ImpactMetricSumAggregateInputType
    _min?: ImpactMetricMinAggregateInputType
    _max?: ImpactMetricMaxAggregateInputType
  }

  export type ImpactMetricGroupByOutputType = {
    id: string
    label: string
    value: string
    pillar: string | null
    year: number
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: ImpactMetricCountAggregateOutputType | null
    _avg: ImpactMetricAvgAggregateOutputType | null
    _sum: ImpactMetricSumAggregateOutputType | null
    _min: ImpactMetricMinAggregateOutputType | null
    _max: ImpactMetricMaxAggregateOutputType | null
  }

  type GetImpactMetricGroupByPayload<T extends ImpactMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImpactMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImpactMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImpactMetricGroupByOutputType[P]>
            : GetScalarType<T[P], ImpactMetricGroupByOutputType[P]>
        }
      >
    >


  export type ImpactMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    value?: boolean
    pillar?: boolean
    year?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["impactMetric"]>



  export type ImpactMetricSelectScalar = {
    id?: boolean
    label?: boolean
    value?: boolean
    pillar?: boolean
    year?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ImpactMetricOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "label" | "value" | "pillar" | "year" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["impactMetric"]>

  export type $ImpactMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImpactMetric"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      label: string
      value: string
      pillar: string | null
      year: number
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["impactMetric"]>
    composites: {}
  }

  type ImpactMetricGetPayload<S extends boolean | null | undefined | ImpactMetricDefaultArgs> = $Result.GetResult<Prisma.$ImpactMetricPayload, S>

  type ImpactMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImpactMetricFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImpactMetricCountAggregateInputType | true
    }

  export interface ImpactMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImpactMetric'], meta: { name: 'ImpactMetric' } }
    /**
     * Find zero or one ImpactMetric that matches the filter.
     * @param {ImpactMetricFindUniqueArgs} args - Arguments to find a ImpactMetric
     * @example
     * // Get one ImpactMetric
     * const impactMetric = await prisma.impactMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImpactMetricFindUniqueArgs>(args: SelectSubset<T, ImpactMetricFindUniqueArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImpactMetric that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImpactMetricFindUniqueOrThrowArgs} args - Arguments to find a ImpactMetric
     * @example
     * // Get one ImpactMetric
     * const impactMetric = await prisma.impactMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImpactMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, ImpactMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImpactMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImpactMetricFindFirstArgs} args - Arguments to find a ImpactMetric
     * @example
     * // Get one ImpactMetric
     * const impactMetric = await prisma.impactMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImpactMetricFindFirstArgs>(args?: SelectSubset<T, ImpactMetricFindFirstArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImpactMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImpactMetricFindFirstOrThrowArgs} args - Arguments to find a ImpactMetric
     * @example
     * // Get one ImpactMetric
     * const impactMetric = await prisma.impactMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImpactMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, ImpactMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImpactMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImpactMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImpactMetrics
     * const impactMetrics = await prisma.impactMetric.findMany()
     * 
     * // Get first 10 ImpactMetrics
     * const impactMetrics = await prisma.impactMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const impactMetricWithIdOnly = await prisma.impactMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImpactMetricFindManyArgs>(args?: SelectSubset<T, ImpactMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImpactMetric.
     * @param {ImpactMetricCreateArgs} args - Arguments to create a ImpactMetric.
     * @example
     * // Create one ImpactMetric
     * const ImpactMetric = await prisma.impactMetric.create({
     *   data: {
     *     // ... data to create a ImpactMetric
     *   }
     * })
     * 
     */
    create<T extends ImpactMetricCreateArgs>(args: SelectSubset<T, ImpactMetricCreateArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImpactMetrics.
     * @param {ImpactMetricCreateManyArgs} args - Arguments to create many ImpactMetrics.
     * @example
     * // Create many ImpactMetrics
     * const impactMetric = await prisma.impactMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImpactMetricCreateManyArgs>(args?: SelectSubset<T, ImpactMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ImpactMetric.
     * @param {ImpactMetricDeleteArgs} args - Arguments to delete one ImpactMetric.
     * @example
     * // Delete one ImpactMetric
     * const ImpactMetric = await prisma.impactMetric.delete({
     *   where: {
     *     // ... filter to delete one ImpactMetric
     *   }
     * })
     * 
     */
    delete<T extends ImpactMetricDeleteArgs>(args: SelectSubset<T, ImpactMetricDeleteArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImpactMetric.
     * @param {ImpactMetricUpdateArgs} args - Arguments to update one ImpactMetric.
     * @example
     * // Update one ImpactMetric
     * const impactMetric = await prisma.impactMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImpactMetricUpdateArgs>(args: SelectSubset<T, ImpactMetricUpdateArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImpactMetrics.
     * @param {ImpactMetricDeleteManyArgs} args - Arguments to filter ImpactMetrics to delete.
     * @example
     * // Delete a few ImpactMetrics
     * const { count } = await prisma.impactMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImpactMetricDeleteManyArgs>(args?: SelectSubset<T, ImpactMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImpactMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImpactMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImpactMetrics
     * const impactMetric = await prisma.impactMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImpactMetricUpdateManyArgs>(args: SelectSubset<T, ImpactMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ImpactMetric.
     * @param {ImpactMetricUpsertArgs} args - Arguments to update or create a ImpactMetric.
     * @example
     * // Update or create a ImpactMetric
     * const impactMetric = await prisma.impactMetric.upsert({
     *   create: {
     *     // ... data to create a ImpactMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImpactMetric we want to update
     *   }
     * })
     */
    upsert<T extends ImpactMetricUpsertArgs>(args: SelectSubset<T, ImpactMetricUpsertArgs<ExtArgs>>): Prisma__ImpactMetricClient<$Result.GetResult<Prisma.$ImpactMetricPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImpactMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImpactMetricCountArgs} args - Arguments to filter ImpactMetrics to count.
     * @example
     * // Count the number of ImpactMetrics
     * const count = await prisma.impactMetric.count({
     *   where: {
     *     // ... the filter for the ImpactMetrics we want to count
     *   }
     * })
    **/
    count<T extends ImpactMetricCountArgs>(
      args?: Subset<T, ImpactMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImpactMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImpactMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImpactMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ImpactMetricAggregateArgs>(args: Subset<T, ImpactMetricAggregateArgs>): Prisma.PrismaPromise<GetImpactMetricAggregateType<T>>

    /**
     * Group by ImpactMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImpactMetricGroupByArgs} args - Group by arguments.
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
      T extends ImpactMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImpactMetricGroupByArgs['orderBy'] }
        : { orderBy?: ImpactMetricGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ImpactMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImpactMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImpactMetric model
   */
  readonly fields: ImpactMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImpactMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImpactMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ImpactMetric model
   */
  interface ImpactMetricFieldRefs {
    readonly id: FieldRef<"ImpactMetric", 'String'>
    readonly label: FieldRef<"ImpactMetric", 'String'>
    readonly value: FieldRef<"ImpactMetric", 'String'>
    readonly pillar: FieldRef<"ImpactMetric", 'String'>
    readonly year: FieldRef<"ImpactMetric", 'Int'>
    readonly notes: FieldRef<"ImpactMetric", 'String'>
    readonly createdAt: FieldRef<"ImpactMetric", 'DateTime'>
    readonly updatedAt: FieldRef<"ImpactMetric", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ImpactMetric findUnique
   */
  export type ImpactMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * Filter, which ImpactMetric to fetch.
     */
    where: ImpactMetricWhereUniqueInput
  }

  /**
   * ImpactMetric findUniqueOrThrow
   */
  export type ImpactMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * Filter, which ImpactMetric to fetch.
     */
    where: ImpactMetricWhereUniqueInput
  }

  /**
   * ImpactMetric findFirst
   */
  export type ImpactMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * Filter, which ImpactMetric to fetch.
     */
    where?: ImpactMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImpactMetrics to fetch.
     */
    orderBy?: ImpactMetricOrderByWithRelationInput | ImpactMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImpactMetrics.
     */
    cursor?: ImpactMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImpactMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImpactMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImpactMetrics.
     */
    distinct?: ImpactMetricScalarFieldEnum | ImpactMetricScalarFieldEnum[]
  }

  /**
   * ImpactMetric findFirstOrThrow
   */
  export type ImpactMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * Filter, which ImpactMetric to fetch.
     */
    where?: ImpactMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImpactMetrics to fetch.
     */
    orderBy?: ImpactMetricOrderByWithRelationInput | ImpactMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImpactMetrics.
     */
    cursor?: ImpactMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImpactMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImpactMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImpactMetrics.
     */
    distinct?: ImpactMetricScalarFieldEnum | ImpactMetricScalarFieldEnum[]
  }

  /**
   * ImpactMetric findMany
   */
  export type ImpactMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * Filter, which ImpactMetrics to fetch.
     */
    where?: ImpactMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImpactMetrics to fetch.
     */
    orderBy?: ImpactMetricOrderByWithRelationInput | ImpactMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImpactMetrics.
     */
    cursor?: ImpactMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImpactMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImpactMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImpactMetrics.
     */
    distinct?: ImpactMetricScalarFieldEnum | ImpactMetricScalarFieldEnum[]
  }

  /**
   * ImpactMetric create
   */
  export type ImpactMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * The data needed to create a ImpactMetric.
     */
    data: XOR<ImpactMetricCreateInput, ImpactMetricUncheckedCreateInput>
  }

  /**
   * ImpactMetric createMany
   */
  export type ImpactMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImpactMetrics.
     */
    data: ImpactMetricCreateManyInput | ImpactMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImpactMetric update
   */
  export type ImpactMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * The data needed to update a ImpactMetric.
     */
    data: XOR<ImpactMetricUpdateInput, ImpactMetricUncheckedUpdateInput>
    /**
     * Choose, which ImpactMetric to update.
     */
    where: ImpactMetricWhereUniqueInput
  }

  /**
   * ImpactMetric updateMany
   */
  export type ImpactMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImpactMetrics.
     */
    data: XOR<ImpactMetricUpdateManyMutationInput, ImpactMetricUncheckedUpdateManyInput>
    /**
     * Filter which ImpactMetrics to update
     */
    where?: ImpactMetricWhereInput
    /**
     * Limit how many ImpactMetrics to update.
     */
    limit?: number
  }

  /**
   * ImpactMetric upsert
   */
  export type ImpactMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * The filter to search for the ImpactMetric to update in case it exists.
     */
    where: ImpactMetricWhereUniqueInput
    /**
     * In case the ImpactMetric found by the `where` argument doesn't exist, create a new ImpactMetric with this data.
     */
    create: XOR<ImpactMetricCreateInput, ImpactMetricUncheckedCreateInput>
    /**
     * In case the ImpactMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImpactMetricUpdateInput, ImpactMetricUncheckedUpdateInput>
  }

  /**
   * ImpactMetric delete
   */
  export type ImpactMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
    /**
     * Filter which ImpactMetric to delete.
     */
    where: ImpactMetricWhereUniqueInput
  }

  /**
   * ImpactMetric deleteMany
   */
  export type ImpactMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImpactMetrics to delete
     */
    where?: ImpactMetricWhereInput
    /**
     * Limit how many ImpactMetrics to delete.
     */
    limit?: number
  }

  /**
   * ImpactMetric without action
   */
  export type ImpactMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImpactMetric
     */
    select?: ImpactMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImpactMetric
     */
    omit?: ImpactMetricOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const PublicationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    authors: 'authors',
    year: 'year',
    type: 'type',
    pillar: 'pillar',
    status: 'status',
    abstract: 'abstract',
    url: 'url',
    doi: 'doi',
    pdfUrl: 'pdfUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PublicationScalarFieldEnum = (typeof PublicationScalarFieldEnum)[keyof typeof PublicationScalarFieldEnum]


  export const TeamMemberScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    institution: 'institution',
    country: 'country',
    pillar: 'pillar',
    bio: 'bio',
    email: 'email',
    imageUrl: 'imageUrl',
    linkedin: 'linkedin',
    twitter: 'twitter',
    instagram: 'instagram',
    website: 'website',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamMemberScalarFieldEnum = (typeof TeamMemberScalarFieldEnum)[keyof typeof TeamMemberScalarFieldEnum]


  export const NewsEventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    type: 'type',
    date: 'date',
    status: 'status',
    excerpt: 'excerpt',
    content: 'content',
    location: 'location',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsEventScalarFieldEnum = (typeof NewsEventScalarFieldEnum)[keyof typeof NewsEventScalarFieldEnum]


  export const ResearchProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    pillar: 'pillar',
    status: 'status',
    lead: 'lead',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResearchProjectScalarFieldEnum = (typeof ResearchProjectScalarFieldEnum)[keyof typeof ResearchProjectScalarFieldEnum]


  export const PillarContentScalarFieldEnum: {
    id: 'id',
    pillar: 'pillar',
    title: 'title',
    tagline: 'tagline',
    laymanDesc: 'laymanDesc',
    imageUrl: 'imageUrl'
  };

  export type PillarContentScalarFieldEnum = (typeof PillarContentScalarFieldEnum)[keyof typeof PillarContentScalarFieldEnum]


  export const ContactMessageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    organisation: 'organisation',
    subject: 'subject',
    body: 'body',
    read: 'read',
    archived: 'archived',
    createdAt: 'createdAt'
  };

  export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum]


  export const NewsletterSubscriberScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    source: 'source',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsletterSubscriberScalarFieldEnum = (typeof NewsletterSubscriberScalarFieldEnum)[keyof typeof NewsletterSubscriberScalarFieldEnum]


  export const PartnerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    logoUrl: 'logoUrl',
    website: 'website',
    order: 'order',
    active: 'active',
    description: 'description',
    role: 'role',
    isHorizontal: 'isHorizontal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum]


  export const ImpactMetricScalarFieldEnum: {
    id: 'id',
    label: 'label',
    value: 'value',
    pillar: 'pillar',
    year: 'year',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ImpactMetricScalarFieldEnum = (typeof ImpactMetricScalarFieldEnum)[keyof typeof ImpactMetricScalarFieldEnum]


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


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const PasswordResetTokenOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token'
  };

  export type PasswordResetTokenOrderByRelevanceFieldEnum = (typeof PasswordResetTokenOrderByRelevanceFieldEnum)[keyof typeof PasswordResetTokenOrderByRelevanceFieldEnum]


  export const PublicationOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    authors: 'authors',
    pillar: 'pillar',
    abstract: 'abstract',
    url: 'url',
    doi: 'doi',
    pdfUrl: 'pdfUrl'
  };

  export type PublicationOrderByRelevanceFieldEnum = (typeof PublicationOrderByRelevanceFieldEnum)[keyof typeof PublicationOrderByRelevanceFieldEnum]


  export const TeamMemberOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    institution: 'institution',
    country: 'country',
    pillar: 'pillar',
    bio: 'bio',
    email: 'email',
    imageUrl: 'imageUrl',
    linkedin: 'linkedin',
    twitter: 'twitter',
    instagram: 'instagram',
    website: 'website'
  };

  export type TeamMemberOrderByRelevanceFieldEnum = (typeof TeamMemberOrderByRelevanceFieldEnum)[keyof typeof TeamMemberOrderByRelevanceFieldEnum]


  export const NewsEventOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    excerpt: 'excerpt',
    content: 'content',
    location: 'location',
    imageUrl: 'imageUrl'
  };

  export type NewsEventOrderByRelevanceFieldEnum = (typeof NewsEventOrderByRelevanceFieldEnum)[keyof typeof NewsEventOrderByRelevanceFieldEnum]


  export const ResearchProjectOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    pillar: 'pillar',
    lead: 'lead',
    description: 'description'
  };

  export type ResearchProjectOrderByRelevanceFieldEnum = (typeof ResearchProjectOrderByRelevanceFieldEnum)[keyof typeof ResearchProjectOrderByRelevanceFieldEnum]


  export const PillarContentOrderByRelevanceFieldEnum: {
    id: 'id',
    pillar: 'pillar',
    title: 'title',
    tagline: 'tagline',
    laymanDesc: 'laymanDesc',
    imageUrl: 'imageUrl'
  };

  export type PillarContentOrderByRelevanceFieldEnum = (typeof PillarContentOrderByRelevanceFieldEnum)[keyof typeof PillarContentOrderByRelevanceFieldEnum]


  export const ContactMessageOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    organisation: 'organisation',
    subject: 'subject',
    body: 'body'
  };

  export type ContactMessageOrderByRelevanceFieldEnum = (typeof ContactMessageOrderByRelevanceFieldEnum)[keyof typeof ContactMessageOrderByRelevanceFieldEnum]


  export const NewsletterSubscriberOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    source: 'source'
  };

  export type NewsletterSubscriberOrderByRelevanceFieldEnum = (typeof NewsletterSubscriberOrderByRelevanceFieldEnum)[keyof typeof NewsletterSubscriberOrderByRelevanceFieldEnum]


  export const PartnerOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    logoUrl: 'logoUrl',
    website: 'website',
    description: 'description',
    role: 'role'
  };

  export type PartnerOrderByRelevanceFieldEnum = (typeof PartnerOrderByRelevanceFieldEnum)[keyof typeof PartnerOrderByRelevanceFieldEnum]


  export const ImpactMetricOrderByRelevanceFieldEnum: {
    id: 'id',
    label: 'label',
    value: 'value',
    pillar: 'pillar',
    notes: 'notes'
  };

  export type ImpactMetricOrderByRelevanceFieldEnum = (typeof ImpactMetricOrderByRelevanceFieldEnum)[keyof typeof ImpactMetricOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'PublicationType'
   */
  export type EnumPublicationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationType'>
    


  /**
   * Reference to a field of type 'PublicationStatus'
   */
  export type EnumPublicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PublicationStatus'>
    


  /**
   * Reference to a field of type 'NewsEventType'
   */
  export type EnumNewsEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsEventType'>
    


  /**
   * Reference to a field of type 'NewsEventStatus'
   */
  export type EnumNewsEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsEventStatus'>
    


  /**
   * Reference to a field of type 'ResearchStatus'
   */
  export type EnumResearchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResearchStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    passwordResetTokens?: PasswordResetTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passwordResetTokens?: PasswordResetTokenOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    passwordResetTokens?: PasswordResetTokenListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: PasswordResetTokenOrderByRelevanceInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    used?: BoolWithAggregatesFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type PublicationWhereInput = {
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    id?: StringFilter<"Publication"> | string
    title?: StringFilter<"Publication"> | string
    authors?: StringFilter<"Publication"> | string
    year?: IntFilter<"Publication"> | number
    type?: EnumPublicationTypeFilter<"Publication"> | $Enums.PublicationType
    pillar?: StringNullableFilter<"Publication"> | string | null
    status?: EnumPublicationStatusFilter<"Publication"> | $Enums.PublicationStatus
    abstract?: StringNullableFilter<"Publication"> | string | null
    url?: StringNullableFilter<"Publication"> | string | null
    doi?: StringNullableFilter<"Publication"> | string | null
    pdfUrl?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
  }

  export type PublicationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    authors?: SortOrder
    year?: SortOrder
    type?: SortOrder
    pillar?: SortOrderInput | SortOrder
    status?: SortOrder
    abstract?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    doi?: SortOrderInput | SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: PublicationOrderByRelevanceInput
  }

  export type PublicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    title?: StringFilter<"Publication"> | string
    authors?: StringFilter<"Publication"> | string
    year?: IntFilter<"Publication"> | number
    type?: EnumPublicationTypeFilter<"Publication"> | $Enums.PublicationType
    pillar?: StringNullableFilter<"Publication"> | string | null
    status?: EnumPublicationStatusFilter<"Publication"> | $Enums.PublicationStatus
    abstract?: StringNullableFilter<"Publication"> | string | null
    url?: StringNullableFilter<"Publication"> | string | null
    doi?: StringNullableFilter<"Publication"> | string | null
    pdfUrl?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
  }, "id">

  export type PublicationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    authors?: SortOrder
    year?: SortOrder
    type?: SortOrder
    pillar?: SortOrderInput | SortOrder
    status?: SortOrder
    abstract?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    doi?: SortOrderInput | SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PublicationCountOrderByAggregateInput
    _avg?: PublicationAvgOrderByAggregateInput
    _max?: PublicationMaxOrderByAggregateInput
    _min?: PublicationMinOrderByAggregateInput
    _sum?: PublicationSumOrderByAggregateInput
  }

  export type PublicationScalarWhereWithAggregatesInput = {
    AND?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    OR?: PublicationScalarWhereWithAggregatesInput[]
    NOT?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Publication"> | string
    title?: StringWithAggregatesFilter<"Publication"> | string
    authors?: StringWithAggregatesFilter<"Publication"> | string
    year?: IntWithAggregatesFilter<"Publication"> | number
    type?: EnumPublicationTypeWithAggregatesFilter<"Publication"> | $Enums.PublicationType
    pillar?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    status?: EnumPublicationStatusWithAggregatesFilter<"Publication"> | $Enums.PublicationStatus
    abstract?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    url?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    doi?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    pdfUrl?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
  }

  export type TeamMemberWhereInput = {
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    name?: StringFilter<"TeamMember"> | string
    role?: StringFilter<"TeamMember"> | string
    institution?: StringFilter<"TeamMember"> | string
    country?: StringFilter<"TeamMember"> | string
    pillar?: StringNullableFilter<"TeamMember"> | string | null
    bio?: StringNullableFilter<"TeamMember"> | string | null
    email?: StringNullableFilter<"TeamMember"> | string | null
    imageUrl?: StringNullableFilter<"TeamMember"> | string | null
    linkedin?: StringNullableFilter<"TeamMember"> | string | null
    twitter?: StringNullableFilter<"TeamMember"> | string | null
    instagram?: StringNullableFilter<"TeamMember"> | string | null
    website?: StringNullableFilter<"TeamMember"> | string | null
    active?: BoolFilter<"TeamMember"> | boolean
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMember"> | Date | string
  }

  export type TeamMemberOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    institution?: SortOrder
    country?: SortOrder
    pillar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    twitter?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: TeamMemberOrderByRelevanceInput
  }

  export type TeamMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    name?: StringFilter<"TeamMember"> | string
    role?: StringFilter<"TeamMember"> | string
    institution?: StringFilter<"TeamMember"> | string
    country?: StringFilter<"TeamMember"> | string
    pillar?: StringNullableFilter<"TeamMember"> | string | null
    bio?: StringNullableFilter<"TeamMember"> | string | null
    email?: StringNullableFilter<"TeamMember"> | string | null
    imageUrl?: StringNullableFilter<"TeamMember"> | string | null
    linkedin?: StringNullableFilter<"TeamMember"> | string | null
    twitter?: StringNullableFilter<"TeamMember"> | string | null
    instagram?: StringNullableFilter<"TeamMember"> | string | null
    website?: StringNullableFilter<"TeamMember"> | string | null
    active?: BoolFilter<"TeamMember"> | boolean
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMember"> | Date | string
  }, "id">

  export type TeamMemberOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    institution?: SortOrder
    country?: SortOrder
    pillar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    twitter?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamMemberCountOrderByAggregateInput
    _max?: TeamMemberMaxOrderByAggregateInput
    _min?: TeamMemberMinOrderByAggregateInput
  }

  export type TeamMemberScalarWhereWithAggregatesInput = {
    AND?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    OR?: TeamMemberScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMember"> | string
    name?: StringWithAggregatesFilter<"TeamMember"> | string
    role?: StringWithAggregatesFilter<"TeamMember"> | string
    institution?: StringWithAggregatesFilter<"TeamMember"> | string
    country?: StringWithAggregatesFilter<"TeamMember"> | string
    pillar?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    bio?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    email?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    linkedin?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    twitter?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    website?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    active?: BoolWithAggregatesFilter<"TeamMember"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
  }

  export type NewsEventWhereInput = {
    AND?: NewsEventWhereInput | NewsEventWhereInput[]
    OR?: NewsEventWhereInput[]
    NOT?: NewsEventWhereInput | NewsEventWhereInput[]
    id?: StringFilter<"NewsEvent"> | string
    title?: StringFilter<"NewsEvent"> | string
    type?: EnumNewsEventTypeFilter<"NewsEvent"> | $Enums.NewsEventType
    date?: DateTimeFilter<"NewsEvent"> | Date | string
    status?: EnumNewsEventStatusFilter<"NewsEvent"> | $Enums.NewsEventStatus
    excerpt?: StringNullableFilter<"NewsEvent"> | string | null
    content?: StringNullableFilter<"NewsEvent"> | string | null
    location?: StringNullableFilter<"NewsEvent"> | string | null
    imageUrl?: StringNullableFilter<"NewsEvent"> | string | null
    createdAt?: DateTimeFilter<"NewsEvent"> | Date | string
    updatedAt?: DateTimeFilter<"NewsEvent"> | Date | string
  }

  export type NewsEventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: NewsEventOrderByRelevanceInput
  }

  export type NewsEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewsEventWhereInput | NewsEventWhereInput[]
    OR?: NewsEventWhereInput[]
    NOT?: NewsEventWhereInput | NewsEventWhereInput[]
    title?: StringFilter<"NewsEvent"> | string
    type?: EnumNewsEventTypeFilter<"NewsEvent"> | $Enums.NewsEventType
    date?: DateTimeFilter<"NewsEvent"> | Date | string
    status?: EnumNewsEventStatusFilter<"NewsEvent"> | $Enums.NewsEventStatus
    excerpt?: StringNullableFilter<"NewsEvent"> | string | null
    content?: StringNullableFilter<"NewsEvent"> | string | null
    location?: StringNullableFilter<"NewsEvent"> | string | null
    imageUrl?: StringNullableFilter<"NewsEvent"> | string | null
    createdAt?: DateTimeFilter<"NewsEvent"> | Date | string
    updatedAt?: DateTimeFilter<"NewsEvent"> | Date | string
  }, "id">

  export type NewsEventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsEventCountOrderByAggregateInput
    _max?: NewsEventMaxOrderByAggregateInput
    _min?: NewsEventMinOrderByAggregateInput
  }

  export type NewsEventScalarWhereWithAggregatesInput = {
    AND?: NewsEventScalarWhereWithAggregatesInput | NewsEventScalarWhereWithAggregatesInput[]
    OR?: NewsEventScalarWhereWithAggregatesInput[]
    NOT?: NewsEventScalarWhereWithAggregatesInput | NewsEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsEvent"> | string
    title?: StringWithAggregatesFilter<"NewsEvent"> | string
    type?: EnumNewsEventTypeWithAggregatesFilter<"NewsEvent"> | $Enums.NewsEventType
    date?: DateTimeWithAggregatesFilter<"NewsEvent"> | Date | string
    status?: EnumNewsEventStatusWithAggregatesFilter<"NewsEvent"> | $Enums.NewsEventStatus
    excerpt?: StringNullableWithAggregatesFilter<"NewsEvent"> | string | null
    content?: StringNullableWithAggregatesFilter<"NewsEvent"> | string | null
    location?: StringNullableWithAggregatesFilter<"NewsEvent"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"NewsEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NewsEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsEvent"> | Date | string
  }

  export type ResearchProjectWhereInput = {
    AND?: ResearchProjectWhereInput | ResearchProjectWhereInput[]
    OR?: ResearchProjectWhereInput[]
    NOT?: ResearchProjectWhereInput | ResearchProjectWhereInput[]
    id?: StringFilter<"ResearchProject"> | string
    title?: StringFilter<"ResearchProject"> | string
    pillar?: StringFilter<"ResearchProject"> | string
    status?: EnumResearchStatusFilter<"ResearchProject"> | $Enums.ResearchStatus
    lead?: StringNullableFilter<"ResearchProject"> | string | null
    description?: StringNullableFilter<"ResearchProject"> | string | null
    startDate?: DateTimeNullableFilter<"ResearchProject"> | Date | string | null
    endDate?: DateTimeNullableFilter<"ResearchProject"> | Date | string | null
    createdAt?: DateTimeFilter<"ResearchProject"> | Date | string
    updatedAt?: DateTimeFilter<"ResearchProject"> | Date | string
  }

  export type ResearchProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    lead?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: ResearchProjectOrderByRelevanceInput
  }

  export type ResearchProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResearchProjectWhereInput | ResearchProjectWhereInput[]
    OR?: ResearchProjectWhereInput[]
    NOT?: ResearchProjectWhereInput | ResearchProjectWhereInput[]
    title?: StringFilter<"ResearchProject"> | string
    pillar?: StringFilter<"ResearchProject"> | string
    status?: EnumResearchStatusFilter<"ResearchProject"> | $Enums.ResearchStatus
    lead?: StringNullableFilter<"ResearchProject"> | string | null
    description?: StringNullableFilter<"ResearchProject"> | string | null
    startDate?: DateTimeNullableFilter<"ResearchProject"> | Date | string | null
    endDate?: DateTimeNullableFilter<"ResearchProject"> | Date | string | null
    createdAt?: DateTimeFilter<"ResearchProject"> | Date | string
    updatedAt?: DateTimeFilter<"ResearchProject"> | Date | string
  }, "id">

  export type ResearchProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    lead?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResearchProjectCountOrderByAggregateInput
    _max?: ResearchProjectMaxOrderByAggregateInput
    _min?: ResearchProjectMinOrderByAggregateInput
  }

  export type ResearchProjectScalarWhereWithAggregatesInput = {
    AND?: ResearchProjectScalarWhereWithAggregatesInput | ResearchProjectScalarWhereWithAggregatesInput[]
    OR?: ResearchProjectScalarWhereWithAggregatesInput[]
    NOT?: ResearchProjectScalarWhereWithAggregatesInput | ResearchProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResearchProject"> | string
    title?: StringWithAggregatesFilter<"ResearchProject"> | string
    pillar?: StringWithAggregatesFilter<"ResearchProject"> | string
    status?: EnumResearchStatusWithAggregatesFilter<"ResearchProject"> | $Enums.ResearchStatus
    lead?: StringNullableWithAggregatesFilter<"ResearchProject"> | string | null
    description?: StringNullableWithAggregatesFilter<"ResearchProject"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"ResearchProject"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"ResearchProject"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ResearchProject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ResearchProject"> | Date | string
  }

  export type PillarContentWhereInput = {
    AND?: PillarContentWhereInput | PillarContentWhereInput[]
    OR?: PillarContentWhereInput[]
    NOT?: PillarContentWhereInput | PillarContentWhereInput[]
    id?: StringFilter<"PillarContent"> | string
    pillar?: StringFilter<"PillarContent"> | string
    title?: StringFilter<"PillarContent"> | string
    tagline?: StringFilter<"PillarContent"> | string
    laymanDesc?: StringNullableFilter<"PillarContent"> | string | null
    imageUrl?: StringNullableFilter<"PillarContent"> | string | null
  }

  export type PillarContentOrderByWithRelationInput = {
    id?: SortOrder
    pillar?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    laymanDesc?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    _relevance?: PillarContentOrderByRelevanceInput
  }

  export type PillarContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pillar?: string
    AND?: PillarContentWhereInput | PillarContentWhereInput[]
    OR?: PillarContentWhereInput[]
    NOT?: PillarContentWhereInput | PillarContentWhereInput[]
    title?: StringFilter<"PillarContent"> | string
    tagline?: StringFilter<"PillarContent"> | string
    laymanDesc?: StringNullableFilter<"PillarContent"> | string | null
    imageUrl?: StringNullableFilter<"PillarContent"> | string | null
  }, "id" | "pillar">

  export type PillarContentOrderByWithAggregationInput = {
    id?: SortOrder
    pillar?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    laymanDesc?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    _count?: PillarContentCountOrderByAggregateInput
    _max?: PillarContentMaxOrderByAggregateInput
    _min?: PillarContentMinOrderByAggregateInput
  }

  export type PillarContentScalarWhereWithAggregatesInput = {
    AND?: PillarContentScalarWhereWithAggregatesInput | PillarContentScalarWhereWithAggregatesInput[]
    OR?: PillarContentScalarWhereWithAggregatesInput[]
    NOT?: PillarContentScalarWhereWithAggregatesInput | PillarContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PillarContent"> | string
    pillar?: StringWithAggregatesFilter<"PillarContent"> | string
    title?: StringWithAggregatesFilter<"PillarContent"> | string
    tagline?: StringWithAggregatesFilter<"PillarContent"> | string
    laymanDesc?: StringNullableWithAggregatesFilter<"PillarContent"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"PillarContent"> | string | null
  }

  export type ContactMessageWhereInput = {
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    id?: StringFilter<"ContactMessage"> | string
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    organisation?: StringNullableFilter<"ContactMessage"> | string | null
    subject?: StringFilter<"ContactMessage"> | string
    body?: StringFilter<"ContactMessage"> | string
    read?: BoolFilter<"ContactMessage"> | boolean
    archived?: BoolFilter<"ContactMessage"> | boolean
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }

  export type ContactMessageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    organisation?: SortOrderInput | SortOrder
    subject?: SortOrder
    body?: SortOrder
    read?: SortOrder
    archived?: SortOrder
    createdAt?: SortOrder
    _relevance?: ContactMessageOrderByRelevanceInput
  }

  export type ContactMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    organisation?: StringNullableFilter<"ContactMessage"> | string | null
    subject?: StringFilter<"ContactMessage"> | string
    body?: StringFilter<"ContactMessage"> | string
    read?: BoolFilter<"ContactMessage"> | boolean
    archived?: BoolFilter<"ContactMessage"> | boolean
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }, "id">

  export type ContactMessageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    organisation?: SortOrderInput | SortOrder
    subject?: SortOrder
    body?: SortOrder
    read?: SortOrder
    archived?: SortOrder
    createdAt?: SortOrder
    _count?: ContactMessageCountOrderByAggregateInput
    _max?: ContactMessageMaxOrderByAggregateInput
    _min?: ContactMessageMinOrderByAggregateInput
  }

  export type ContactMessageScalarWhereWithAggregatesInput = {
    AND?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    OR?: ContactMessageScalarWhereWithAggregatesInput[]
    NOT?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContactMessage"> | string
    name?: StringWithAggregatesFilter<"ContactMessage"> | string
    email?: StringWithAggregatesFilter<"ContactMessage"> | string
    organisation?: StringNullableWithAggregatesFilter<"ContactMessage"> | string | null
    subject?: StringWithAggregatesFilter<"ContactMessage"> | string
    body?: StringWithAggregatesFilter<"ContactMessage"> | string
    read?: BoolWithAggregatesFilter<"ContactMessage"> | boolean
    archived?: BoolWithAggregatesFilter<"ContactMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ContactMessage"> | Date | string
  }

  export type NewsletterSubscriberWhereInput = {
    AND?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    OR?: NewsletterSubscriberWhereInput[]
    NOT?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    id?: StringFilter<"NewsletterSubscriber"> | string
    email?: StringFilter<"NewsletterSubscriber"> | string
    name?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    source?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    active?: BoolFilter<"NewsletterSubscriber"> | boolean
    createdAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
  }

  export type NewsletterSubscriberOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: NewsletterSubscriberOrderByRelevanceInput
  }

  export type NewsletterSubscriberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    OR?: NewsletterSubscriberWhereInput[]
    NOT?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    name?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    source?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    active?: BoolFilter<"NewsletterSubscriber"> | boolean
    createdAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
  }, "id" | "email">

  export type NewsletterSubscriberOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsletterSubscriberCountOrderByAggregateInput
    _max?: NewsletterSubscriberMaxOrderByAggregateInput
    _min?: NewsletterSubscriberMinOrderByAggregateInput
  }

  export type NewsletterSubscriberScalarWhereWithAggregatesInput = {
    AND?: NewsletterSubscriberScalarWhereWithAggregatesInput | NewsletterSubscriberScalarWhereWithAggregatesInput[]
    OR?: NewsletterSubscriberScalarWhereWithAggregatesInput[]
    NOT?: NewsletterSubscriberScalarWhereWithAggregatesInput | NewsletterSubscriberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterSubscriber"> | string
    email?: StringWithAggregatesFilter<"NewsletterSubscriber"> | string
    name?: StringNullableWithAggregatesFilter<"NewsletterSubscriber"> | string | null
    source?: StringNullableWithAggregatesFilter<"NewsletterSubscriber"> | string | null
    active?: BoolWithAggregatesFilter<"NewsletterSubscriber"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterSubscriber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsletterSubscriber"> | Date | string
  }

  export type PartnerWhereInput = {
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    id?: StringFilter<"Partner"> | string
    name?: StringFilter<"Partner"> | string
    logoUrl?: StringNullableFilter<"Partner"> | string | null
    website?: StringNullableFilter<"Partner"> | string | null
    order?: IntFilter<"Partner"> | number
    active?: BoolFilter<"Partner"> | boolean
    description?: StringNullableFilter<"Partner"> | string | null
    role?: StringNullableFilter<"Partner"> | string | null
    isHorizontal?: BoolFilter<"Partner"> | boolean
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
  }

  export type PartnerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    order?: SortOrder
    active?: SortOrder
    description?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    isHorizontal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: PartnerOrderByRelevanceInput
  }

  export type PartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    name?: StringFilter<"Partner"> | string
    logoUrl?: StringNullableFilter<"Partner"> | string | null
    website?: StringNullableFilter<"Partner"> | string | null
    order?: IntFilter<"Partner"> | number
    active?: BoolFilter<"Partner"> | boolean
    description?: StringNullableFilter<"Partner"> | string | null
    role?: StringNullableFilter<"Partner"> | string | null
    isHorizontal?: BoolFilter<"Partner"> | boolean
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
  }, "id">

  export type PartnerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    order?: SortOrder
    active?: SortOrder
    description?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    isHorizontal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerCountOrderByAggregateInput
    _avg?: PartnerAvgOrderByAggregateInput
    _max?: PartnerMaxOrderByAggregateInput
    _min?: PartnerMinOrderByAggregateInput
    _sum?: PartnerSumOrderByAggregateInput
  }

  export type PartnerScalarWhereWithAggregatesInput = {
    AND?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    OR?: PartnerScalarWhereWithAggregatesInput[]
    NOT?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Partner"> | string
    name?: StringWithAggregatesFilter<"Partner"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    website?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    order?: IntWithAggregatesFilter<"Partner"> | number
    active?: BoolWithAggregatesFilter<"Partner"> | boolean
    description?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    role?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    isHorizontal?: BoolWithAggregatesFilter<"Partner"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
  }

  export type ImpactMetricWhereInput = {
    AND?: ImpactMetricWhereInput | ImpactMetricWhereInput[]
    OR?: ImpactMetricWhereInput[]
    NOT?: ImpactMetricWhereInput | ImpactMetricWhereInput[]
    id?: StringFilter<"ImpactMetric"> | string
    label?: StringFilter<"ImpactMetric"> | string
    value?: StringFilter<"ImpactMetric"> | string
    pillar?: StringNullableFilter<"ImpactMetric"> | string | null
    year?: IntFilter<"ImpactMetric"> | number
    notes?: StringNullableFilter<"ImpactMetric"> | string | null
    createdAt?: DateTimeFilter<"ImpactMetric"> | Date | string
    updatedAt?: DateTimeFilter<"ImpactMetric"> | Date | string
  }

  export type ImpactMetricOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    pillar?: SortOrderInput | SortOrder
    year?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: ImpactMetricOrderByRelevanceInput
  }

  export type ImpactMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImpactMetricWhereInput | ImpactMetricWhereInput[]
    OR?: ImpactMetricWhereInput[]
    NOT?: ImpactMetricWhereInput | ImpactMetricWhereInput[]
    label?: StringFilter<"ImpactMetric"> | string
    value?: StringFilter<"ImpactMetric"> | string
    pillar?: StringNullableFilter<"ImpactMetric"> | string | null
    year?: IntFilter<"ImpactMetric"> | number
    notes?: StringNullableFilter<"ImpactMetric"> | string | null
    createdAt?: DateTimeFilter<"ImpactMetric"> | Date | string
    updatedAt?: DateTimeFilter<"ImpactMetric"> | Date | string
  }, "id">

  export type ImpactMetricOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    pillar?: SortOrderInput | SortOrder
    year?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ImpactMetricCountOrderByAggregateInput
    _avg?: ImpactMetricAvgOrderByAggregateInput
    _max?: ImpactMetricMaxOrderByAggregateInput
    _min?: ImpactMetricMinOrderByAggregateInput
    _sum?: ImpactMetricSumOrderByAggregateInput
  }

  export type ImpactMetricScalarWhereWithAggregatesInput = {
    AND?: ImpactMetricScalarWhereWithAggregatesInput | ImpactMetricScalarWhereWithAggregatesInput[]
    OR?: ImpactMetricScalarWhereWithAggregatesInput[]
    NOT?: ImpactMetricScalarWhereWithAggregatesInput | ImpactMetricScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImpactMetric"> | string
    label?: StringWithAggregatesFilter<"ImpactMetric"> | string
    value?: StringWithAggregatesFilter<"ImpactMetric"> | string
    pillar?: StringNullableWithAggregatesFilter<"ImpactMetric"> | string | null
    year?: IntWithAggregatesFilter<"ImpactMetric"> | number
    notes?: StringNullableWithAggregatesFilter<"ImpactMetric"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ImpactMetric"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ImpactMetric"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetTokensInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationCreateInput = {
    id?: string
    title: string
    authors: string
    year: number
    type: $Enums.PublicationType
    pillar?: string | null
    status?: $Enums.PublicationStatus
    abstract?: string | null
    url?: string | null
    doi?: string | null
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUncheckedCreateInput = {
    id?: string
    title: string
    authors: string
    year: number
    type: $Enums.PublicationType
    pillar?: string | null
    status?: $Enums.PublicationStatus
    abstract?: string | null
    url?: string | null
    doi?: string | null
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    authors?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    type?: EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    doi?: NullableStringFieldUpdateOperationsInput | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    authors?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    type?: EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    doi?: NullableStringFieldUpdateOperationsInput | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationCreateManyInput = {
    id?: string
    title: string
    authors: string
    year: number
    type: $Enums.PublicationType
    pillar?: string | null
    status?: $Enums.PublicationStatus
    abstract?: string | null
    url?: string | null
    doi?: string | null
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    authors?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    type?: EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    doi?: NullableStringFieldUpdateOperationsInput | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    authors?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    type?: EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    doi?: NullableStringFieldUpdateOperationsInput | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateInput = {
    id?: string
    name: string
    role: string
    institution: string
    country: string
    pillar?: string | null
    bio?: string | null
    email?: string | null
    imageUrl?: string | null
    linkedin?: string | null
    twitter?: string | null
    instagram?: string | null
    website?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberUncheckedCreateInput = {
    id?: string
    name: string
    role: string
    institution: string
    country: string
    pillar?: string | null
    bio?: string | null
    email?: string | null
    imageUrl?: string | null
    linkedin?: string | null
    twitter?: string | null
    instagram?: string | null
    website?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateManyInput = {
    id?: string
    name: string
    role: string
    institution: string
    country: string
    pillar?: string | null
    bio?: string | null
    email?: string | null
    imageUrl?: string | null
    linkedin?: string | null
    twitter?: string | null
    instagram?: string | null
    website?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    institution?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsEventCreateInput = {
    id?: string
    title: string
    type: $Enums.NewsEventType
    date: Date | string
    status?: $Enums.NewsEventStatus
    excerpt?: string | null
    content?: string | null
    location?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsEventUncheckedCreateInput = {
    id?: string
    title: string
    type: $Enums.NewsEventType
    date: Date | string
    status?: $Enums.NewsEventStatus
    excerpt?: string | null
    content?: string | null
    location?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsEventTypeFieldUpdateOperationsInput | $Enums.NewsEventType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumNewsEventStatusFieldUpdateOperationsInput | $Enums.NewsEventStatus
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsEventTypeFieldUpdateOperationsInput | $Enums.NewsEventType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumNewsEventStatusFieldUpdateOperationsInput | $Enums.NewsEventStatus
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsEventCreateManyInput = {
    id?: string
    title: string
    type: $Enums.NewsEventType
    date: Date | string
    status?: $Enums.NewsEventStatus
    excerpt?: string | null
    content?: string | null
    location?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsEventTypeFieldUpdateOperationsInput | $Enums.NewsEventType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumNewsEventStatusFieldUpdateOperationsInput | $Enums.NewsEventStatus
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsEventTypeFieldUpdateOperationsInput | $Enums.NewsEventType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumNewsEventStatusFieldUpdateOperationsInput | $Enums.NewsEventStatus
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchProjectCreateInput = {
    id?: string
    title: string
    pillar: string
    status?: $Enums.ResearchStatus
    lead?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResearchProjectUncheckedCreateInput = {
    id?: string
    title: string
    pillar: string
    status?: $Enums.ResearchStatus
    lead?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResearchProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    status?: EnumResearchStatusFieldUpdateOperationsInput | $Enums.ResearchStatus
    lead?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    status?: EnumResearchStatusFieldUpdateOperationsInput | $Enums.ResearchStatus
    lead?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchProjectCreateManyInput = {
    id?: string
    title: string
    pillar: string
    status?: $Enums.ResearchStatus
    lead?: string | null
    description?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResearchProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    status?: EnumResearchStatusFieldUpdateOperationsInput | $Enums.ResearchStatus
    lead?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    status?: EnumResearchStatusFieldUpdateOperationsInput | $Enums.ResearchStatus
    lead?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PillarContentCreateInput = {
    id?: string
    pillar: string
    title: string
    tagline: string
    laymanDesc?: string | null
    imageUrl?: string | null
  }

  export type PillarContentUncheckedCreateInput = {
    id?: string
    pillar: string
    title: string
    tagline: string
    laymanDesc?: string | null
    imageUrl?: string | null
  }

  export type PillarContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    laymanDesc?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PillarContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    laymanDesc?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PillarContentCreateManyInput = {
    id?: string
    pillar: string
    title: string
    tagline: string
    laymanDesc?: string | null
    imageUrl?: string | null
  }

  export type PillarContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    laymanDesc?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PillarContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pillar?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    laymanDesc?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContactMessageCreateInput = {
    id?: string
    name: string
    email: string
    organisation?: string | null
    subject: string
    body: string
    read?: boolean
    archived?: boolean
    createdAt?: Date | string
  }

  export type ContactMessageUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    organisation?: string | null
    subject: string
    body: string
    read?: boolean
    archived?: boolean
    createdAt?: Date | string
  }

  export type ContactMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    organisation?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    organisation?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateManyInput = {
    id?: string
    name: string
    email: string
    organisation?: string | null
    subject: string
    body: string
    read?: boolean
    archived?: boolean
    createdAt?: Date | string
  }

  export type ContactMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    organisation?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    organisation?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberCreateInput = {
    id?: string
    email: string
    name?: string | null
    source?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriberUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    source?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    source?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerCreateInput = {
    id?: string
    name: string
    logoUrl?: string | null
    website?: string | null
    order?: number
    active?: boolean
    description?: string | null
    role?: string | null
    isHorizontal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUncheckedCreateInput = {
    id?: string
    name: string
    logoUrl?: string | null
    website?: string | null
    order?: number
    active?: boolean
    description?: string | null
    role?: string | null
    isHorizontal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isHorizontal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isHorizontal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerCreateManyInput = {
    id?: string
    name: string
    logoUrl?: string | null
    website?: string | null
    order?: number
    active?: boolean
    description?: string | null
    role?: string | null
    isHorizontal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isHorizontal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isHorizontal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImpactMetricCreateInput = {
    id?: string
    label: string
    value: string
    pillar?: string | null
    year: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImpactMetricUncheckedCreateInput = {
    id?: string
    label: string
    value: string
    pillar?: string | null
    year: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImpactMetricUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImpactMetricUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImpactMetricCreateManyInput = {
    id?: string
    label: string
    value: string
    pillar?: string | null
    year: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImpactMetricUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImpactMetricUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    pillar?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type PasswordResetTokenListRelationFilter = {
    every?: PasswordResetTokenWhereInput
    some?: PasswordResetTokenWhereInput
    none?: PasswordResetTokenWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PasswordResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PasswordResetTokenOrderByRelevanceInput = {
    fields: PasswordResetTokenOrderByRelevanceFieldEnum | PasswordResetTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumPublicationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | EnumPublicationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationType[]
    notIn?: $Enums.PublicationType[]
    not?: NestedEnumPublicationTypeFilter<$PrismaModel> | $Enums.PublicationType
  }

  export type EnumPublicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | EnumPublicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationStatus[]
    notIn?: $Enums.PublicationStatus[]
    not?: NestedEnumPublicationStatusFilter<$PrismaModel> | $Enums.PublicationStatus
  }

  export type PublicationOrderByRelevanceInput = {
    fields: PublicationOrderByRelevanceFieldEnum | PublicationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PublicationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    authors?: SortOrder
    year?: SortOrder
    type?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    abstract?: SortOrder
    url?: SortOrder
    doi?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type PublicationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    authors?: SortOrder
    year?: SortOrder
    type?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    abstract?: SortOrder
    url?: SortOrder
    doi?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    authors?: SortOrder
    year?: SortOrder
    type?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    abstract?: SortOrder
    url?: SortOrder
    doi?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationSumOrderByAggregateInput = {
    year?: SortOrder
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

  export type EnumPublicationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | EnumPublicationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationType[]
    notIn?: $Enums.PublicationType[]
    not?: NestedEnumPublicationTypeWithAggregatesFilter<$PrismaModel> | $Enums.PublicationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPublicationTypeFilter<$PrismaModel>
    _max?: NestedEnumPublicationTypeFilter<$PrismaModel>
  }

  export type EnumPublicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | EnumPublicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationStatus[]
    notIn?: $Enums.PublicationStatus[]
    not?: NestedEnumPublicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PublicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPublicationStatusFilter<$PrismaModel>
    _max?: NestedEnumPublicationStatusFilter<$PrismaModel>
  }

  export type TeamMemberOrderByRelevanceInput = {
    fields: TeamMemberOrderByRelevanceFieldEnum | TeamMemberOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TeamMemberCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    institution?: SortOrder
    country?: SortOrder
    pillar?: SortOrder
    bio?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
    linkedin?: SortOrder
    twitter?: SortOrder
    instagram?: SortOrder
    website?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    institution?: SortOrder
    country?: SortOrder
    pillar?: SortOrder
    bio?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
    linkedin?: SortOrder
    twitter?: SortOrder
    instagram?: SortOrder
    website?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMemberMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    institution?: SortOrder
    country?: SortOrder
    pillar?: SortOrder
    bio?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
    linkedin?: SortOrder
    twitter?: SortOrder
    instagram?: SortOrder
    website?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNewsEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventType | EnumNewsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventType[]
    notIn?: $Enums.NewsEventType[]
    not?: NestedEnumNewsEventTypeFilter<$PrismaModel> | $Enums.NewsEventType
  }

  export type EnumNewsEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventStatus | EnumNewsEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventStatus[]
    notIn?: $Enums.NewsEventStatus[]
    not?: NestedEnumNewsEventStatusFilter<$PrismaModel> | $Enums.NewsEventStatus
  }

  export type NewsEventOrderByRelevanceInput = {
    fields: NewsEventOrderByRelevanceFieldEnum | NewsEventOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type NewsEventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsEventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsEventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    location?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNewsEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventType | EnumNewsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventType[]
    notIn?: $Enums.NewsEventType[]
    not?: NestedEnumNewsEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.NewsEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsEventTypeFilter<$PrismaModel>
    _max?: NestedEnumNewsEventTypeFilter<$PrismaModel>
  }

  export type EnumNewsEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventStatus | EnumNewsEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventStatus[]
    notIn?: $Enums.NewsEventStatus[]
    not?: NestedEnumNewsEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsEventStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsEventStatusFilter<$PrismaModel>
  }

  export type EnumResearchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResearchStatus | EnumResearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResearchStatus[]
    notIn?: $Enums.ResearchStatus[]
    not?: NestedEnumResearchStatusFilter<$PrismaModel> | $Enums.ResearchStatus
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

  export type ResearchProjectOrderByRelevanceInput = {
    fields: ResearchProjectOrderByRelevanceFieldEnum | ResearchProjectOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ResearchProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    lead?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResearchProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    lead?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResearchProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    pillar?: SortOrder
    status?: SortOrder
    lead?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumResearchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResearchStatus | EnumResearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResearchStatus[]
    notIn?: $Enums.ResearchStatus[]
    not?: NestedEnumResearchStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResearchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResearchStatusFilter<$PrismaModel>
    _max?: NestedEnumResearchStatusFilter<$PrismaModel>
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

  export type PillarContentOrderByRelevanceInput = {
    fields: PillarContentOrderByRelevanceFieldEnum | PillarContentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PillarContentCountOrderByAggregateInput = {
    id?: SortOrder
    pillar?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    laymanDesc?: SortOrder
    imageUrl?: SortOrder
  }

  export type PillarContentMaxOrderByAggregateInput = {
    id?: SortOrder
    pillar?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    laymanDesc?: SortOrder
    imageUrl?: SortOrder
  }

  export type PillarContentMinOrderByAggregateInput = {
    id?: SortOrder
    pillar?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    laymanDesc?: SortOrder
    imageUrl?: SortOrder
  }

  export type ContactMessageOrderByRelevanceInput = {
    fields: ContactMessageOrderByRelevanceFieldEnum | ContactMessageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContactMessageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    organisation?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    read?: SortOrder
    archived?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    organisation?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    read?: SortOrder
    archived?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    organisation?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    read?: SortOrder
    archived?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterSubscriberOrderByRelevanceInput = {
    fields: NewsletterSubscriberOrderByRelevanceFieldEnum | NewsletterSubscriberOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type NewsletterSubscriberCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    source?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriberMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    source?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriberMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    source?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerOrderByRelevanceInput = {
    fields: PartnerOrderByRelevanceFieldEnum | PartnerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PartnerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    website?: SortOrder
    order?: SortOrder
    active?: SortOrder
    description?: SortOrder
    role?: SortOrder
    isHorizontal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    website?: SortOrder
    order?: SortOrder
    active?: SortOrder
    description?: SortOrder
    role?: SortOrder
    isHorizontal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logoUrl?: SortOrder
    website?: SortOrder
    order?: SortOrder
    active?: SortOrder
    description?: SortOrder
    role?: SortOrder
    isHorizontal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ImpactMetricOrderByRelevanceInput = {
    fields: ImpactMetricOrderByRelevanceFieldEnum | ImpactMetricOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ImpactMetricCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    pillar?: SortOrder
    year?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImpactMetricAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type ImpactMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    pillar?: SortOrder
    year?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImpactMetricMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    pillar?: SortOrder
    year?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImpactMetricSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type PasswordResetTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PasswordResetTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    upsert?: UserUpsertWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, UserUpdateWithoutPasswordResetTokensInput>, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPublicationTypeFieldUpdateOperationsInput = {
    set?: $Enums.PublicationType
  }

  export type EnumPublicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.PublicationStatus
  }

  export type EnumNewsEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.NewsEventType
  }

  export type EnumNewsEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.NewsEventStatus
  }

  export type EnumResearchStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResearchStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPublicationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | EnumPublicationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationType[]
    notIn?: $Enums.PublicationType[]
    not?: NestedEnumPublicationTypeFilter<$PrismaModel> | $Enums.PublicationType
  }

  export type NestedEnumPublicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | EnumPublicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationStatus[]
    notIn?: $Enums.PublicationStatus[]
    not?: NestedEnumPublicationStatusFilter<$PrismaModel> | $Enums.PublicationStatus
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

  export type NestedEnumPublicationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationType | EnumPublicationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationType[]
    notIn?: $Enums.PublicationType[]
    not?: NestedEnumPublicationTypeWithAggregatesFilter<$PrismaModel> | $Enums.PublicationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPublicationTypeFilter<$PrismaModel>
    _max?: NestedEnumPublicationTypeFilter<$PrismaModel>
  }

  export type NestedEnumPublicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PublicationStatus | EnumPublicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PublicationStatus[]
    notIn?: $Enums.PublicationStatus[]
    not?: NestedEnumPublicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.PublicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPublicationStatusFilter<$PrismaModel>
    _max?: NestedEnumPublicationStatusFilter<$PrismaModel>
  }

  export type NestedEnumNewsEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventType | EnumNewsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventType[]
    notIn?: $Enums.NewsEventType[]
    not?: NestedEnumNewsEventTypeFilter<$PrismaModel> | $Enums.NewsEventType
  }

  export type NestedEnumNewsEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventStatus | EnumNewsEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventStatus[]
    notIn?: $Enums.NewsEventStatus[]
    not?: NestedEnumNewsEventStatusFilter<$PrismaModel> | $Enums.NewsEventStatus
  }

  export type NestedEnumNewsEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventType | EnumNewsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventType[]
    notIn?: $Enums.NewsEventType[]
    not?: NestedEnumNewsEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.NewsEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsEventTypeFilter<$PrismaModel>
    _max?: NestedEnumNewsEventTypeFilter<$PrismaModel>
  }

  export type NestedEnumNewsEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsEventStatus | EnumNewsEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsEventStatus[]
    notIn?: $Enums.NewsEventStatus[]
    not?: NestedEnumNewsEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsEventStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsEventStatusFilter<$PrismaModel>
  }

  export type NestedEnumResearchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResearchStatus | EnumResearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResearchStatus[]
    notIn?: $Enums.ResearchStatus[]
    not?: NestedEnumResearchStatusFilter<$PrismaModel> | $Enums.ResearchStatus
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

  export type NestedEnumResearchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResearchStatus | EnumResearchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResearchStatus[]
    notIn?: $Enums.ResearchStatus[]
    not?: NestedEnumResearchStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResearchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResearchStatusFilter<$PrismaModel>
    _max?: NestedEnumResearchStatusFilter<$PrismaModel>
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

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenCreateManyUserInputEnvelope = {
    data: PasswordResetTokenCreateManyUserInput | PasswordResetTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetTokenScalarWhereInput
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetTokenScalarWhereInput = {
    AND?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    OR?: PasswordResetTokenScalarWhereInput[]
    NOT?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type UserCreateWithoutPasswordResetTokensInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
  }

  export type UserUpsertWithoutPasswordResetTokensInput = {
    update: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type UserUpdateWithoutPasswordResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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