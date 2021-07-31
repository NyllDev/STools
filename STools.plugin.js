/**
 * @name STools
 * @author Nyll
 * @authorId 239559651203481600
 * @version 1.0.1
 * @description Кара божья.
 * @author Denis Solo (Windsor).
 * @website https://nyll.dev/
 * @updateUrl https://nylldev.github.io/STools/STools.plugin.js
*/

module.exports = (_ => {
    const config = {
        "info": {
            "name": "STools",
            "author": "Nyll",
            "version": "1.0.1",
            "description": "Discord Admin Tools"
        },
        "changeLog": {
            "improved": {
                "Quick Action": "Init"
            }
        }
    };

    return (window.Lightcord || window.LightCord) ? class {
    } : !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
    } : (([Plugin, BDFDB]) => {

        const muteStorage = [
            {time: 60,	 label: "Оскорбление", 										reason: "Оскорбление участников", 														rule: "Запрещено в любом виде оскорблять любых участников в любом из каналов. | Mute: 60-180m"},
            {time: 30,	 label: "Капс",  											reason: "Капс в чате", 																	rule: "Запрещено использовать CAPS(исключение: выделение определенного слова в предложении). | Mute 30-100m"},
            {time: 40,	 label: "Неуважительное отношение", 						reason: "Неуважительное отношение к любому из участников", 								rule: "Запрещено неуважительное отношение к любому из участников. | Mute 40-60m"},
            {time: 180,	 label: "Оскорбление по нац. признаку", 					reason: "Оскорбление по нацианальному признаку", 										rule: "Запрещено указывать участнику на его национальность, тем самым оскорбляя его. | Mute: 180m/ ban: 1d"},
            {time: 30,	 label: "Флуд", 											reason: "Флуд (от 3 одинаковых сообщений подряд менее чем за минуту)", 					rule: "Запрещено флудить(от 3-ех одинаковых сообщений в минуту(касается и смайликов)) | Mute:  30 - 60m "},
            {time: 180,	 label: "Отсылка к возрасту", 								reason: "Отсылка к возрасту участника с целью унижения", 								rule: "Запрещено в любом виде ссылаться на возраст участника с целью его унизить. | Mute: 180m"},
            {time: 40,	 label: "Мат", 												reason: "Мат в любом из каналов чата", 													rule: "Запрещен мат в любом канале/чате. | Mute: 40-100m"},
            {time: 40,	 label: "Выпрашивание банов / разбанов и т.д", 				reason: "Выпрашивание банов / разбанов / варнов / разварнов", 							rule: "Выпрашивать баны/разбаны/варны/разварны и т.д. | Mute 40-60m"},
            {time: 60,	 label: "Провокация на нарушение", 							reason: "Провокация на нарушение правил", 												rule: "Запрещено провоцировать игроков на нарушение правил. | Mute: 60m / kick"},
            {time: 40,	 label: "Завуалированный мат", 								reason: "Завуалированный мат", 															rule: "Запрещено завуалировать мат(как дополнение к пункту 8). | Mute: 40-100m"},
            {time: 60,	 label: "Нецензурные картинки / gif / видео", 				reason: "Нецензурные картинки / гифки / видео с нецензурной бранью / оскорблением", 	rule: "Запрещено отправлять в чате картинки/gif/видео с нецензурной бранью/оскорбительным характером. | Mute: 60-120m/Ban 15d(зависит от тяжести нарушения)"},
            {time: 300,	 label: "Упоминание родственников", 						reason: "Упоминание родственников в любом виде", 										rule: "Запрещено оскорбление или упоминание родственников в любом виде. | | Mute: 300m/Ban 15d(зависит от тяжести нарушения)"},
            {time: 200,	 label: "Оскорбление национальности", 						reason: "Оскорбление / затрагивание национальностьи или рассовую принадлежность", 		rule: "Запрещено каким-либо образом оскорблять/затрагивать национальность или расовую принадлежность. | Mute: 200m"},
            {time: 30,	 label: "Нерациональное использование чата", 				reason: "Нерациональное использование чата", 											rule: "Запрещено нерациональное использование чата. | Mute: 30-100m"},
            {time: 200,	 label: "Распространять нац.с", 							reason: "Распространять нац. символику", 												rule: "Запрещено распространять нац. символику.. | Mute: 200m / Ban 10d"},
            {time: 40,	 label: "Создание Конфликтой ситуации", 					reason: "Создание Конфликтой ситуации", 												rule: "Запрещено разводить срачи, конфликты друг с другом и другими участниками дискорда. | Mute: 40 - 60"},
            {time: 60,	 label: "Нарушение правил рекламы организации", 			reason: "Нарушение правил рекламы организации", 										rule: "Рекламировать наборы в орг | партии, обзвоны на старший состав, а так же реклама в целом можно раз в 10 минут. | Mute: 60m "},
            {time: 40,	 label: "Обсуждать действия модерации/администрации", 		reason: "Обсуждать действия модерации/администрации", 									rule: "Запрещено обсуждать действия модерации/администрации (в любом виде связи) | Mute: 40-60m"},
            {time: 120,	 label: "Публиковать материалов(18+)", 						reason: "Публиковать фотографии нецензурного характера(18+)", 							rule: "Запрещено публиковать фотографии нецензурного характера(18+). | Mute: 40-60m"},
            {time: 30,	 label: "Нарушение правил !bio ",						 	reason: "Нарушение правил !bio", 														rule: "Запрещено выкладывать в !bio неуважительную к участнику информацию, тем самым его оскорбляя/унижая/критикуя. | Mute: 30-120m"},
            {time: 40,	 label: "Оффтопить в каналах с выдачей ролей ",  			reason: "Оффтоп", 																		rule: "Запрещено оффтопить в каналах с выдачей ролей / запросом ролей / репортом и предложениями / открытия кейсов. | Mute: 40-120m"},
            {time: 1,	 label: "Test ",  			reason: "Test", 																		rule: "Test"},
        ]

        return class STools extends Plugin {
            showPenaltyModal(_time, _reason, _user, _rulesText) {
                console.log(_user)
                BDFDB.ModalUtils.open(this, {
                    size: "SMALL",
                    header: "Наказание пользователя - " + _user.username,
                    subHeader: _rulesText,
                    scroller: false,
                    children: [
                        this.textArea = BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextArea, {
                            value: "!mute " + _user.id + " " + _time + " " + _reason,
                            placeholder: "note",
                            autoFocus: true
                        })
                    ],
                    buttons: [{
                        contents: "Наказать",
                        color: "BRAND",
                        close: true,
                        click: modal => {
                            console.log(this.textArea.props.value)
                            BdApi.findModuleByProps("sendMessage").sendMessage('703596630892478509', {
                                content: this.textArea.props.value
                            });
                        }
                    }]
                })
            }

            onUserContextMenu(e) {
                if (e.instance.props.user) {
                    let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: "devmode-copy-id", group: true});

                    if (index > -1) {
                        children.splice(index, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem,{
                            label: "[MUTE] Выдать наказание",
                            id: BDFDB.ContextMenuUtils.createItemId(this.name, "stools-submenu1-mute-penalty"),
                            children: Object.keys(muteStorage).map(n => BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuGroup, {
                                children: BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
                                    label: muteStorage[n].label,
                                    id: BDFDB.ContextMenuUtils.createItemId(this.name, "stools-submenu1-mute-penalty-item", n),
                                    action: _ => {
                                        this.showPenaltyModal(muteStorage[n].time, muteStorage[n].reason, e.instance.props.user, muteStorage[n].label.rule)
                                    }
                                })
                            }))

                        }))
                    }
                }
            }

        };
    })(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();