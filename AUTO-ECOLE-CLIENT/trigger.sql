drop  database if exists controle permis;
create database controle permis;
use controle permis;
 create table candidat
 (codec int not null,
 	nomc varchar(25),
 	primary key(codec)
 );
 create table examenP
 (codeP int not null,
  primary key(codeP)
  ); 

 create table examenC
 (codeCO int not null,
  primary key(codeCO)
  );

  create table passerC
  	(codec int not null,
  	 codeCO int not null,
  	 dateheure datetime,
  	 resultat enum ('valider','recaler'),
  	 primary key(codec,codeCO)	,
  	 foreign key (codec) references candidat(codec),
  	 foreign key(codeCO) references examenC(codeco)
  	 );
 create table passerp
  	(codec int not null,
  	 codeP int not null,
  	 dateheure datetime,
  	 resultat enum ('valider','recaler'),
  	 primary key(codec,codeP),
  	 foreign key (codec) references candidat(codec),
  	 foreign key(codeP) references examenp(codeP)
  	 );

drop trigger  if exists verifpermis;
delimiter //
create trigger verifpermis
	before insert on passerp
	for each row
	begin 
	declare x int ;
	select count(*) into x
	from passerC
	where codec=new.codec and resultat='valider';
	if x=0
	then signal sqlstate'45000'
	    set message_text='vous devez réussire l'' examen code' ;

	 end if ;
	 end //  
 delimiter ;	 


drop trigger  if exists verifpermisup;
delimiter //
create trigger verifpermisup
  before update on passerp
  for each row
  begin 
  declare x int ;
  select count(*) into x
  from passerC
  where codec=new.codec and resultat='valider';
  if x=0
  then signal sqlstate'45000'
      set message_text='vous devez réussire l'' examen code' ;

   end if ;
   end //  
 delimiter ;   
 


 /*insert into candidat values (1,'jean'),
                              (2,'faissal'),
                              (3,'kiry') ;

  insert into examenc values( 25) ;

  insert into examenP values( 48) ;

  	insert into passerC values(1,25,sysdate(),'recaler'),
  		                       (2,25,sysdate(),'valider');

  		                      insert into passerp values(1,48,sysdate(),null);
  		                       (2,25,sysdate(),null) ;

  		                        insert into passerp values(2,48,sysdate(),null);

  		                        	insert into passerp values(3,48,sysdate(),null); */



                               
