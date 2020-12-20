export class CodeSamples {
    private readonly samples: Map<string, string> = new Map<string, string>([
        [
            'ProducerConsumerAdvanced.Com',
            `COMPONENT { ENTRYPOINT } ProducerConsumer;
    CONSTANT
        N = 1; (* producers *)
        M = 1; (* consumers *)
        K = 100000; (* original: 1000000; (* amount per producer *)
        C = 10; (* buffer capacity *)
        Output = TRUE; (* original: FALSE; *)

    COMPONENT Producer REQUIRES DataAcceptor;
        VARIABLE i: INTEGER;
        ACTIVITY
            FOR i := 1 TO K DO
                DataAcceptor!Element(i)
            END;
            DataAcceptor!Finished
    END Producer;

    COMPONENT Consumer REQUIRES DataSource;
        VARIABLE x: INTEGER;
        ACTIVITY
            WHILE DataSource?Element DO
                DataSource?Element(x);
                IF Output AND (x MOD (K DIV 10) = 0) THEN WRITE(x); WRITELINE END
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
            a[position: INTEGER]: INTEGER {ARRAY};
            first, last: INTEGER;
            nofProducers: INTEGER;

        IMPLEMENTATION DataAcceptor;
            BEGIN
                WHILE ?Element DO {EXCLUSIVE}
                    AWAIT(last-first < C);
                    ?Element(a[last MOD C]); INC(last)
                END;
                ?Finished;
                BEGIN {EXCLUSIVE} DEC(nofProducers) END
        END DataAcceptor;

        IMPLEMENTATION DataSource;
            VARIABLE stop: BOOLEAN;
            BEGIN
                stop := FALSE;
                REPEAT {EXCLUSIVE}
                    AWAIT((first < last) OR (nofProducers = 0));
                    IF first < last THEN
                        !Element(a[first MOD C]); INC(first)
                    ELSE stop := TRUE
                    END
                UNTIL stop;
                !Finished
        END DataSource;

        BEGIN
            first := 0; last := 0; nofProducers := N
    END BoundedBuffer;

    VARIABLE
        buffer: BoundedBuffer;
        producer[number: INTEGER]: Producer;
        consumer[number: INTEGER]: Consumer;
        i: INTEGER;
    BEGIN
        WRITE(N); WRITE(" producers "); WRITE(M); WRITE(" consumers"); WRITELINE;
        NEW(buffer);
        FOR i := 1 TO N DO
            NEW(producer[i]); CONNECT(DataAcceptor(buffer), producer[i])
        END;
        FOR i := 1 TO M DO
            NEW(consumer[i]); CONNECT(DataSource(buffer), consumer[i])
        END;
        FOR i := 1 TO M DO DELETE(consumer[i]) END;
        WRITE("Done"); WRITELINE
END ProducerConsumer;`,
        ],
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
        ],
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
        ],
        [
            'ProducerConsumer.Com',
            `COMPONENT { ENTRYPOINT } ProducerConsumer;
    CONSTANT 
        N = 1; (* producers *)
        M = 1; (* consumers *)
        K = 100; (* lower for now 1000000; (* amount per producer *)
        C = 10; (* buffer capacity *)
        Output = TRUE;

    COMPONENT Producer REQUIRES DataAcceptor;
        VARIABLE i: INTEGER;
        BEGIN
            WRITE("Producer RUNNING\\n")
        ACTIVITY
            WRITE("Start Producer Activity\\n");
            FOR i := 1 TO K DO
                DataAcceptor!Element(i)
            END;
            WRITE("Finishing Producer Activity\\n");
            DataAcceptor!Finished
    END Producer;

    COMPONENT Consumer REQUIRES DataSource;
        VARIABLE x: INTEGER;
        BEGIN
            WRITE("Consumer RUNNING\\n")
        ACTIVITY
            WRITE("Start Consumer Activity\\n");
            WHILE DataSource?Element DO 
                DataSource?Element(x);
                IF Output AND (x MOD (K DIV C) = 0) THEN
                    WRITE("x: "); WRITE(x); WRITELINE
                END
            END;
            WRITE("Finishing Consumer Activity\\n");
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
            p0: INTEGER; p1: INTEGER; p2: INTEGER; p3: INTEGER; p4: INTEGER;
            p5: INTEGER; p6: INTEGER; p7: INTEGER; p8: INTEGER; p9: INTEGER;
            first, last: INTEGER; 
            nofProducers: INTEGER;
            index: INTEGER;

        IMPLEMENTATION DataAcceptor;
            BEGIN
                WRITE("Begin DataAcceptor\\n");
                WHILE ?Element DO {EXCLUSIVE}
                    IF (last-first < C) THEN
                        index := last MOD C;
                        IF index = 0 THEN
                            ?Element(p0);
                            WRITE("?p0: ");
                            WRITE(p0); WRITELINE
                        ELSIF index = 1 THEN
                            ?Element(p1);
                            WRITE("?p1: ");
                            WRITE(p1); WRITELINE
                        ELSIF index = 2 THEN
                            ?Element(p2);
                            WRITE("?p2: ");
                            WRITE(p2); WRITELINE
                        ELSIF index = 3 THEN
                            ?Element(p3);
                            WRITE("?p3: ");
                            WRITE(p3); WRITELINE
                        ELSIF index = 4 THEN
                            ?Element(p4);
                            WRITE("?p4: ");
                            WRITE(p4); WRITELINE
                        ELSIF index = 5 THEN
                            ?Element(p5);
                            WRITE("?p5: ");
                            WRITE(p5); WRITELINE
                        ELSIF index = 6 THEN
                            ?Element(p6);
                            WRITE("?p6: ");
                            WRITE(p6); WRITELINE
                        ELSIF index = 7 THEN
                            ?Element(p7);
                            WRITE("?p7: ");
                            WRITE(p7); WRITELINE
                        ELSIF index = 8 THEN
                            ?Element(p8);
                            WRITE("?p8: ");
                            WRITE(p8); WRITELINE
                        ELSIF index = 9 THEN
                            ?Element(p9);
                            WRITE("?p9: ");
                            WRITE(p9); WRITELINE
                        END;
                        INC(last)
                    END
                END;
                WRITE("DataAcceptor Done\\n");
                ?Finished; 
                BEGIN {EXCLUSIVE} DEC(nofProducers) END
        END DataAcceptor;

        IMPLEMENTATION DataSource;
            VARIABLE stop: BOOLEAN; index: INTEGER;
            BEGIN
                WRITE("Begin DataSource\\n");
                stop := FALSE;
                REPEAT {EXCLUSIVE}
                    IF (first < last) (* OR (nofProducers = 0) *) THEN
                        index := first MOD C;
                        IF index = 0 THEN
                            WRITE("!p0: ");
                            WRITE(p0); WRITELINE;
                            !Element(p0)
                        ELSIF index = 1 THEN
                            WRITE("!p1: ");
                            WRITE(p1); WRITELINE;
                            !Element(p1)
                        ELSIF index = 2 THEN
                            WRITE("!p2: ");
                            WRITE(p2); WRITELINE;
                            !Element(p2)
                        ELSIF index = 3 THEN
                            WRITE("!p3: ");
                            WRITE(p3); WRITELINE;
                            !Element(p3)
                        ELSIF index = 4 THEN
                            WRITE("!p4: ");
                            WRITE(p4); WRITELINE;
                            !Element(p4)
                        ELSIF index = 5 THEN
                            WRITE("!p5: ");
                            WRITE(p5); WRITELINE;
                            !Element(p5)
                        ELSIF index = 6 THEN
                            WRITE("!p6: ");
                            WRITE(p6); WRITELINE;
                            !Element(p6)
                        ELSIF index = 7 THEN
                            WRITE("!p7: ");
                            WRITE(p7); WRITELINE;
                            !Element(p7)
                        ELSIF index = 8 THEN
                            WRITE("!p8: ");
                            WRITE(p8); WRITELINE;
                            !Element(p8)
                        ELSIF index = 9 THEN
                            WRITE("!p9: ");
                            WRITE(p9); WRITELINE;
                            !Element(p9)
                        END;
                        INC(first)
                    ELSE
                        stop := TRUE;
                        WRITE("Stopping Data Source\\n")
                    END
                UNTIL stop;
                WRITE("DataSource Done\\n");
                !Finished
        END DataSource;

        BEGIN
            WRITE("Begin BoundedBuffer\\n");
            first := 0; last := 0; nofProducers := N;
            WRITE("Begin BoundedBuffer Done\\n")
    END BoundedBuffer;
    
    VARIABLE 
        buffer: BoundedBuffer; 
        producer: Producer; 
        consumer: Consumer; 
    BEGIN
        WRITE("Begin ProducerConsumer"); WRITELINE;
        WRITE(N); WRITE(" producers "); WRITE(M); WRITE(" consumers"); WRITELINE;
        NEW(buffer); 
        WRITE("Creating Producer\\n");
        NEW(producer); CONNECT(DataAcceptor(buffer), producer);
        WRITE("Creating Consumer\\n");
        NEW(consumer); CONNECT(DataSource(buffer), consumer);
        DELETE(consumer);
        DELETE(producer);
        WRITE("ProducerConsumer Done"); WRITELINE
END ProducerConsumer;`,
        ] /* */,
    ]);

    getSamples(): Map<string, string> {
        return this.samples;
    }
}
