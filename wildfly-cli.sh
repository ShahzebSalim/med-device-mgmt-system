#!/bin/bash
/opt/jboss/wildfly/bin/jboss-cli.sh --connect --controller=localhost:9990 << 'COMMANDS'
batch
/subsystem=datasources/data-source=mdmsDB:add(jndi-name="java:/jdbc/mdmsDB",driver-name="h2",connection-url="jdbc:h2:mem:mdms;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",user-name="sa",password="sa",use-java-context=true,max-pool-size=20,min-pool-size=5)
/subsystem=datasources/data-source=mdmsDB:write-attribute(name=enabled,value=true)
run-batch
reload
COMMANDS
