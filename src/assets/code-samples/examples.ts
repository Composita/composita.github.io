export class CodeSamples {
    private readonly samples: Map<string, string> = new Map<string, string>([
        [
            'ComponentHelloWorld.Com',
            `INTERFACE HelloWorld;
  { IN Hello(hello: TEXT) OUT World(world: TEXT) } IN Done
END HelloWorld;

COMPONENT CompHelloWorld OFFERS HelloWorld;
  CONSTANT world = "World"; 
  VARIABLE input: TEXT;
  IMPLEMENTATION HelloWorld;
    BEGIN
      WRITE("Waiting for input\\n");
      WHILE ?Hello DO
        ?Hello(input);
        WRITE("Server Received\\n");
        WRITE(input); WRITELINE;
        WRITE("Server Sending\\n");
        !World(world)
      END
  END HelloWorld;
  BEGIN
    WRITE("Hello World Starting\\n")
  FINALLY
    WRITE("Goodbye Hello World\\n")
END CompHelloWorld;

COMPONENT CompSender REQUIRES HelloWorld;
  VARIABLE world: TEXT; i: INTEGER;
  ACTIVITY
    WRITE("Starting Sender\\n");
    FOR i := 1 TO 10 DO
      WRITE("Client Sending\\n");
      HelloWorld!Hello("Hello");
      WRITE("Client Receiving\\n");
      HelloWorld?World(world);
      WRITE(world); WRITELINE
    END;
    HelloWorld!Done
END CompSender;

COMPONENT { ENTRYPOINT } Connector;
  VARIABLE helloWorld: CompHelloWorld; sender: CompSender;
  BEGIN
    WRITE("STARTING CONNECTOR\\n");
    NEW(helloWorld);
    NEW(sender);
    CONNECT(HelloWorld(helloWorld), sender);
    DELETE(helloWorld);
    DELETE(sender)
END Connector;`,
        ] /*,
        [
            'SkipCounter.Com',
            `COMPONENT { ENTRYPOINT } SkipCounter;
  VARIABLE
    i: INTEGER;
    j: INTEGER;
    max: INTEGER;
  BEGIN
    i := 1;
    j := 1;
    max := 100000;
    WHILE (i < max) DO
      WRITE(i);
      INC(i, j);
      INC(j);
      WRITELINE
    END
END SkipCounter;`,
        ],
        [
            'HelloWorld.Com',
            `COMPONENT { ENTRYPOINT } HelloWorld;
  BEGIN
    WRITE("Hello World"); WRITELINE
END HelloWorld;`,
        ] */ /*,
        [
            'ProducerConsumer.Com',
            `COMPONENT Producer REQUIRES DataAcceptor;
    VARIABLE i: INTEGER;
    CONSTANT 
        K = 1000000; (* amount per producer *)
    BEGIN
        FOR i := 1 TO K DO
            DataAcceptor!Element(i)
        END;
        DataAcceptor!Finished
END Producer;

COMPONENT Consumer REQUIRES DataSource;
    VARIABLE x: INTEGER;
    CONSTANT 
        K = 1000000; (* amount per producer *)
        C = 10; (* buffer capacity *)
        Output = TRUE;
    BEGIN
        WHILE DataSource?Element DO 
            DataSource?Element(x);
            IF Output AND (x MOD (K DIV C) = 0) THEN WRITE(x); WRITELINE END
        END;
        DataSource?Finished
END Consumer;

INTERFACE DataAcceptor;
    { IN Element(x: INTEGER) } IN Finished
END DataAcceptor;

INTERFACE DataSource;
    { OUT Element(x: INTEGER) } OUT Finished
END DataSource;

COMPONENT BoundedBuffer OFFERS DataAcceptor, DataSource;
    VARIABLE 
        a[position: INTEGER]: INTEGER;
        p0: INTEGER; p1: INTEGER; p2: INTEGER; p3: INTEGER; p4: INTEGER;
        p5: INTEGER; p6: INTEGER; p7: INTEGER; p8: INTEGER; p9: INTEGER;
        first, last: INTEGER; 
        nofProducers: INTEGER;
        index: INTEGER;
    CONSTANT 
        C = 10; (* buffer capacity *)
        N = 1; (* producers *)

    IMPLEMENTATION DataAcceptor;
        BEGIN
            WHILE ?Element DO {EXCLUSIVE}
                IF (last-first < C) THEN
                    index := last MOD C;
                    IF index = 0 THEN
                        ?Element(p0)
                    ELSIF index = 1 THEN
                        ?Element(p1)
                    ELSIF index = 2 THEN
                        ?Element(p2)
                    ELSIF index = 3 THEN
                        ?Element(p3)
                    ELSIF index = 4 THEN
                        ?Element(p4)
                    ELSIF index = 5 THEN
                        ?Element(p5)
                    ELSIF index = 6 THEN
                        ?Element(p6)
                    ELSIF index = 7 THEN
                        ?Element(p7)
                    ELSIF index = 8 THEN
                        ?Element(p8)
                    ELSIF index = 9 THEN
                        ?Element(p9)
                    END;
                    INC(last)
                END
            END;
            ?Finished; 
            BEGIN {EXCLUSIVE} DEC(nofProducers) END
    END DataAcceptor;

    IMPLEMENTATION DataSource;
        VARIABLE stop: BOOLEAN; index: INTEGER;
        BEGIN
            stop := FALSE;
            REPEAT {EXCLUSIVE}
                IF first < last THEN
                    index := last MOD C;
                    IF index = 0 THEN
                        !Element(p0)
                    ELSIF index = 1 THEN
                        !Element(p1)
                    ELSIF index = 2 THEN
                        !Element(p2)
                    ELSIF index = 3 THEN
                        !Element(p3)
                    ELSIF index = 4 THEN
                        !Element(p4)
                    ELSIF index = 5 THEN
                        !Element(p5)
                    ELSIF index = 6 THEN
                        !Element(p6)
                    ELSIF index = 7 THEN
                        !Element(p7)
                    ELSIF index = 8 THEN
                        !Element(p8)
                    ELSIF index = 9 THEN
                        !Element(p9)
                    END;
                    INC(first)
                ELSE stop := TRUE
                END
            UNTIL stop;
            !Finished
    END DataSource;

    BEGIN
        first := 0; last := 0; nofProducers := N
END BoundedBuffer;
    
COMPONENT { ENTRYPOINT } ProducerConsumer;
    CONSTANT 
        N = 1; (* producers *)
        M = 1; (* consumers *)
        K = 1000000; (* amount per producer *)
        C = 10; (* buffer capacity *)
        Output = TRUE;
    VARIABLE 
        buffer: BoundedBuffer; 
        producer: Producer; 
        consumer: Consumer; 
    BEGIN
        WRITE(N); WRITE(" producers "); WRITE(M); WRITE(" consumers"); WRITELINE;
        NEW(buffer); 
        NEW(producer); CONNECT(DataAcceptor(producer), buffer);
        NEW(consumer); CONNECT(DataSource(consumer), buffer);
        DELETE(consumer);
        WRITE("Done"); WRITELINE
END ProducerConsumer;`,
        ] /* */,
    ]);

    getSamples(): Map<string, string> {
        return this.samples;
        //return new Map<string, string>([
        //    ['HelloWorld.Com', this.samples.get('HelloWorld.Com') ?? ''],
        //    ['SkipCounter.Com', this.samples.get('SkipCounter.Com') ?? ''],
        //]);
    }
}
