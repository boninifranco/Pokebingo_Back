import { Chat } from 'src/chat/entities/chat.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import {Entity,JoinColumn,OneToMany,OneToOne,PrimaryGeneratedColumn,} from 'typeorm';

@Entity('sala')
export class Sala {
  @PrimaryGeneratedColumn('increment')
  salaId: number;

  @OneToMany(() => Chat, (chat) => chat.sala, { cascade: true, onDelete: 'CASCADE'  })
  @JoinColumn({ name: 'chatId' })
  public chat: Chat[];

  @OneToOne(() => Partida, partida => partida.sala,{cascade: true, onDelete: 'CASCADE'  })
  partida: Partida;
}
