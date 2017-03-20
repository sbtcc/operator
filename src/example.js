import React       from 'react';
import { connect } from 'react-redux';
import autobind    from 'autobind-decorator';

import { polling, send, clear } from './example_actions';

import {
	ActionItem,
	ActionsMenu,
	Button,
	ButtonType,
	Content,
	Col,
	HorizontalRule,
	HorizontalSelector,
	IconType,
	InfoVersion,
	MenuSideBottom,
	MenuSideTop,
	MenuItem,
	MenuProfile,
	MiniTabs,
	OptionItem,
	Panel,
	RootComponent,
	RootLayout,
	Row,
	Select,
	Sidebar,
	Textarea,
} from "ufs-ui";

@autobind
class Example extends React.Component<any, any> {
    constructor(props) {
	super(props);
	this.state = {
	        message: ""
	}
    }

    componentDidMount(){
	this.props.polling('xxx');
    }

    nop(){
    }

    onMessageChange(value){
	this.setState({
	        message: value
	})
    }

    onPressSend(event){
	const {	message } = this.state;
	this.props.send({
	        id: 'xxx',
		author:'staff',
		message
	});
	this.setState({
	        message: " "
	});
    }

    onFinish(){
console.log("onFinish");
	this.props.clear();
	this.setState({
	        message: " "
	});
    }
	
    render() {
	const { data } = this.props;
	const messages = data.data instanceof Array ? data.data : [];

        return (
            <RootComponent>
                <Sidebar>
                    <MenuSideTop>
                        <MenuItem className="sber_logo" />
			<MenuItem icon={IconType.MENU_CATALOG} />
			<MenuItem icon={IconType.MENU_TELECOM} pressed />
			<MenuItem icon={IconType.MENU_SALES} />
                    </MenuSideTop>
                    <MenuSideBottom>
			<MenuProfile profile={"Настройки профиля"}/>
                    </MenuSideBottom>
                </Sidebar>

                <Content>
			<div>
				<span>На линии</span>
				<span>След. планируемый стаус</span>
				<span>На линии</span>
				<span>Время работы 00:45:15</span>
				<span>Время перерыва 00:15:11</span>
			</div>
			
			<div>
				<span>00:05</span>
			</div>
			
			<div>
				<ActionsMenu title="Завершить" action={this.onFinish} className="pull-right" >
			                <ActionItem
			                    onClick={this.nop}
			                    text="Редактировать" />
				
			                <ActionItem
			                    disabled
			                    onClick={this.nop}
			                    text="Переместить" />
				
			                <ActionItem
			                    onClick={this.nop}
			                    text="Скопировать" />
			
			                <HorizontalRule />
						
			                <ActionItem
			                    onClick={this.nop}
			                    text="Удалить" />
				</ActionsMenu>

				<h1>ООО "Промстройинвест"</h1>
				<span>Константинопольский Константин</span>
			</div>



			<Row>
				<Col xs={4}>
					<Panel block>
						<div>
							{messages.map(_itm=>{
								return (
									<p>{_itm.message}</p>
								)
							})}
						</div>

						<br/>
						<br/>
						<br/>
						<div style={{borderBottom:"1px dotted grey", margin:"10px 0"}}></div>

						<Row><Col xs={12}>
						<Textarea ref="abc" block rows={5} label="Сообщение" onChange={this.onMessageChange} value={this.state.message}/>
						</Col></Row>

						<Button className="pull-right" onClick={this.onPressSend}>Отправить</Button>

						<div style={{clear:"both"}}></div>
					</Panel>
				</Col>
				<Col xs={8}>
					<Panel block>
						<MiniTabs fullWidth value={1}>
							<OptionItem value={1}>Заполнение платежного поручения</OptionItem>
							<OptionItem value={2}>Еще</OptionItem>
						</MiniTabs>

						<br/>

						<Button type={ButtonType.ARROW_NEXT}>Определение тематики</Button>

						<HorizontalSelector value={2}>
							<OptionItem value={1}>Опер. поддержка</OptionItem>
							<OptionItem value={2}>Консультация</OptionItem>
							<OptionItem value={3}>Претензии и Благодарности</OptionItem>
						</HorizontalSelector>

						<Select caption="Тематика обращения" value={2}>
							<OptionItem value={1}>Что-то еще</OptionItem>
							<OptionItem value={2}>Заполнение платежного поручения</OptionItem>
							<OptionItem value={3}>Еще что-то</OptionItem>
						</Select>

						<div style={{backgroundColor:"rgb(74,144,226)", margin:"10px 0", borderRadius:10, color:"#fff", padding:"10px 10px"}}>Проверьте, правильно ли опеределена тематика обращения. Если нет, то измените ее
						</div>
						
						<br/>
						<br/>
						<br/>
						<div style={{borderBottom:"1px dotted grey", margin:"10px 0"}}></div>

						<Button type={ButtonType.ARROW_NEXT} className="pull-right">Далее</Button>

						<div style={{clear:"both"}}></div>
						
					</Panel>
				</Col>
			</Row>
                </Content>

            </RootComponent>
        );
    }
}


const mapStateToProps = state => {
	return {
		data : state.workspace.example_reducer,
	}
}

const mapDispatchToProps = {
        polling,
	send,
	clear,
}

export default connect(mapStateToProps, mapDispatchToProps)(Example)
